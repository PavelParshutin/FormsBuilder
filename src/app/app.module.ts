import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { styleReducer } from './store/component-styles.reduser';
import { ReactiveComponentModule } from '@ngrx/component';
import { SharedModule } from './shared/shared.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing-module';
import { FormBuilderModule } from './form-builder-page/form-builder.module';
import {AuthService} from "./services/auth.service";
import {EffectsModule} from "@ngrx/effects";
import {Effects} from "./store/effects";
import {authReducer} from "./store/auth.reducer";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    PortalModule,
    EffectsModule.forRoot([Effects]),
    StoreModule.forRoot({ defaultComponentStyles: styleReducer, authReducer: authReducer }),
    //StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ReactiveComponentModule,
    SharedModule,
    FormBuilderModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
