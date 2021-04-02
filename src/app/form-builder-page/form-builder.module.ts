import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveComponentModule } from '@ngrx/component';
import { PortalModule } from '@angular/cdk/portal';

import { AccordionSectionComponent } from './accordion-section/accordion-section.component';
import { FormBuilderPageComponent } from './form-builder-page.component';
import { LoginPageComponent } from '../login-page/login-page/login-page.component';
import { InputTextComponent } from './components/input-text.component';
import { ButtonComponent } from './components/button.component';
import { CheckboxComponent } from './components/checkbox.component';
import { TextAreaComponent } from './components/text-area.component';
import { SelectComponent } from './components/select.component';
import { LabelComponent } from './components/label.component';
import { StylesBlockComponent } from './styles-block/styles-block.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    LoginPageComponent,
    InputTextComponent,
    ButtonComponent,
    CheckboxComponent,
    TextAreaComponent,
    SelectComponent,
    LabelComponent,
    AccordionSectionComponent,
    StylesBlockComponent,
    FormBuilderPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    DragDropModule,
    PortalModule
  ],
  exports: [FormBuilderPageComponent]
})
export class FormBuilderModule { }
