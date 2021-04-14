import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';

import { getDefaultStyles } from '../../../../store/component-styles.reduser';
import {
  setNewGeneralBtnStyleAction,
  setNewGeneralCheckboxStyleAction,
  setNewGeneralInputStyleAction,
  setNewGeneralLabelStyleAction,
  setNewGeneralSelectStyleAction,
  setNewGeneralTextAreaStyleAction
} from '../../../../store/component-styles.actions';

@Component({
  selector: 'app-general-style',
  templateUrl: './general-style.component.html',
  styleUrls: ['./general-style.component.scss']
})
export class GeneralStyleComponent implements OnInit {

  @ViewChild('propName') newPropKey: ElementRef
  @ViewChild('propValue')newPropValue: ElementRef

  @Input() id;
  @Input() title;
  @Input() style;
  @Input() anotherProperties;
  form: FormGroup

  defaultStyles

  active = false;
  showStyleBlock = false
  showApplyBtn = false
  showAddProperty = false
  isErrorMessage = false

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.createForm()
  }


  createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.title),
      style: new FormGroup({
        // type: new FormControl()
      }),
    });
    for (const prop in this.style) {
      (<FormGroup> this.form.controls['style']).addControl(prop, new FormControl(this.style[prop]));
    }
  }

  showNewPropertyInputs(): void {
    this.showAddProperty = !this.showAddProperty
    this.showApplyBtn = !this.showApplyBtn
    this.isErrorMessage = false
  }

  showInputs(): void {
    this.active = !this.active
    this.isErrorMessage = false
    if(this.showAddProperty !== true){
      this.showApplyBtn = !this.showApplyBtn
    }
  }

  addNewStyleProperty(): boolean {
    const controlName = this.newPropKey ? this.newPropKey.nativeElement.value : null;
    const controlValue = this.newPropValue ? this.newPropValue.nativeElement.value : null;
    if (controlName && controlValue && !Object.keys(this.form.value.style).includes(controlName)){
      this.store.select(getDefaultStyles).subscribe(styles => this.defaultStyles = styles )
      for(const prop in this.defaultStyles){
        if(prop === controlName || this.defaultStyles[prop] === controlName){
          (<FormGroup> this.form.controls['style']).addControl(prop, new FormControl(controlValue));
          return true
        }
      }
    }
    this.isErrorMessage = true
    this.showApplyBtn = true
    return false
  }


  deleteStyleProp(controlName): void {
    (<FormGroup> this.form.controls['style']).removeControl(controlName);
    this.onSubmit()
  }

  onSubmit(): void {
    if(this.addNewStyleProperty() || !this.showAddProperty) {
      this.showApplyBtn = false
      this.active = false;
      this.showAddProperty = false
      this.isErrorMessage = false
      switch (this.form.value.title) {
        case 'Button':
          this.store.dispatch(setNewGeneralBtnStyleAction(this.form.value.style))
          break;
        case 'Label':
          this.store.dispatch(setNewGeneralLabelStyleAction(this.form.value.style))
          break;
        case 'Select':
          this.store.dispatch(setNewGeneralSelectStyleAction(this.form.value.style))
          break;
        case 'Input':
          this.store.dispatch(setNewGeneralInputStyleAction(this.form.value.style))
          break;
        case 'checkbox':
          this.store.dispatch(setNewGeneralCheckboxStyleAction(this.form.value.style))
          break;
        case 'text area':
          this.store.dispatch(setNewGeneralTextAreaStyleAction(this.form.value.style))
          break;
      }
    }

  }
}
