import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { LogInUserComponent } from './pages/log-in-user/log-in-user.component';

const routes: Routes = [
  {path: "welcome", component: WelcomeComponent},
  {path: "login", component: LogInUserComponent},
  {path: "register", component: UserRegisterComponent},
  {path: "", component: WelcomeComponent}, //PROVISORIO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
