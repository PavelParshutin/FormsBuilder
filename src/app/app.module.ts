import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveComponentModule } from '@ngrx/component';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing-module';
import { FormBuilderModule } from './form-builder-page/form-builder.module';
import { AuthService } from './services/auth.service';
import { Effects } from './store/effects';
import { authReducer } from './store/auth.reducer';
import { styleReducer } from './store/component-styles.reduser';
import { AuthPageComponent } from './Auth/auth-page/auth-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AuthPageComponent
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
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ReactiveComponentModule,
    SharedModule,
    FormBuilderModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
