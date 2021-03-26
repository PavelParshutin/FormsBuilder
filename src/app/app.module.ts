import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import { InputTextComponent } from './components/input-text.component';
import { ButtonComponent } from './components/button.component';
import { CheckboxComponent } from './components/checkbox.component';
import { TextAreaComponent } from './components/text-area.component';
import { SelectComponent } from './components/select.component';
import { LabelComponent } from './components/label.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {styleReducer} from './store/defaultStyles.reduser';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputTextComponent,
    ButtonComponent,
    CheckboxComponent,
    TextAreaComponent,
    SelectComponent,
    LabelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    PortalModule,
    StoreModule.forRoot({defaultComponentStyles: styleReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
