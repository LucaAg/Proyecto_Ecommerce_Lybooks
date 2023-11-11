import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {path: "Welcome", component: WelcomeComponent},
  {path: "", component: WelcomeComponent}, //PROVISORIO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
