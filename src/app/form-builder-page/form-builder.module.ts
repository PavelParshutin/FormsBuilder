import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveComponentModule } from '@ngrx/component';
import { PortalModule } from '@angular/cdk/portal';

import { AccordionSectionComponent } from './accordion-section/accordion-section.component';
import { FormBuilderPageComponent } from './form-builder-page.component';
import { LoginPageComponent } from '../Auth/login-page/login-page.component';
import { InputTextComponent } from './shared/components/input-text.component';
import { ButtonComponent } from './shared/components/button.component';
import { CheckboxComponent } from './shared/components/checkbox.component';
import { TextAreaComponent } from './shared/components/text-area.component';
import { SelectComponent } from './shared/components/select.component';
import { LabelComponent } from './shared/components/label.component';
import { StylesBlockComponent } from './styles-block/styles-block.component';
import { BrowserModule } from '@angular/platform-browser';
import { GeneralStyleComponent } from './accordion-section/app-general-style/general-style/general-style.component';


@NgModule({
  declarations: [
    InputTextComponent,
    ButtonComponent,
    CheckboxComponent,
    TextAreaComponent,
    SelectComponent,
    LabelComponent,
    AccordionSectionComponent,
    StylesBlockComponent,
    FormBuilderPageComponent,
    GeneralStyleComponent,
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
