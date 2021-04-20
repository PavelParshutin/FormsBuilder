import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './Auth/registration-page/registration-page.component';
import { LoginPageComponent } from './Auth/login-page/login-page.component';
import { FormBuilderPageComponent } from './form-builder-page/form-builder-page.component';
import { AuthGuard } from './auth.guard';
import {AuthPageComponent} from "./Auth/auth-page/auth-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'registration', component: AuthPageComponent},
  {path: 'login', component: AuthPageComponent},
  {path: 'forms', component: FormBuilderPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
