import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { RegistartionPageComponent } from './registartion-page/registartion-page.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { FormBuilderPageComponent } from './form-builder-page/form-builder-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'registration', component: RegistartionPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'forms', component: FormBuilderPageComponent},
  {path: '**', redirectTo: ''},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
