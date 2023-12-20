import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {  FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environments';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { LogInUserComponent } from './pages/log-in-user/log-in-user.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HomeComponent } from './pages/home/home.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    UserRegisterComponent,
    LogInUserComponent,
    SpinnerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"lybooks","appId":"1:13572782863:web:579dc5d48f2d219f945c7a","storageBucket":"lybooks.appspot.com","apiKey":"AIzaSyC2pkxZTviaSW3cJs3FTRyDpl3BugOPi5Q","authDomain":"lybooks.firebaseapp.com","messagingSenderId":"13572782863"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
