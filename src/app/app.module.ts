import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { InputTextComponent } from './components/input-text.component';
import { ButtonComponent } from './components/button.component';
import { CheckboxComponent } from './components/checkbox.component';
import { TextAreaComponent } from './components/text-area.component';
import { SelectComponent } from './components/select.component';
import { LabelComponent } from './components/label.component';
import { environment } from '../environments/environment';
import { styleReducer } from './store/component-styles.reduser';
import { AccordionSectionComponent } from './acordion-section/accordion-section.component';
import { StylesBlockComponent } from './styles-block/styles-block.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { InputComponent } from './shared/input/input.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputTextComponent,
    ButtonComponent,
    CheckboxComponent,
    TextAreaComponent,
    SelectComponent,
    LabelComponent,
    AccordionSectionComponent,
    StylesBlockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    PortalModule,
    StoreModule.forRoot({ defaultComponentStyles: styleReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ReactiveComponentModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
