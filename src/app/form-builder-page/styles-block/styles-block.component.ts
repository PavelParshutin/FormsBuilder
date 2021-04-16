import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  updateOptionsAction,
  setComponentStyleAction,
  deleteComponentAction, setNewGeneralBtnStyleAction, setDefaultComponentStyleAction
} from '../../store/component-styles.actions';
import { ComponentFields } from '../../store/interfaces';
import { getDefaultStyles } from '../../store/component-styles.reduser';


@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.scss']
})
export class StylesBlockComponent implements OnInit {

  @ViewChild('propName') newPropKey: ElementRef
  @ViewChild('propValue')newPropValue: ElementRef

  @Input() id;
  @Input() componentType;
  @Input() title;
  @Input() style;
  @Input() anotherProperties;

  form: FormGroup;

  defaultStyles

  active = false;
  showStyleBlock = false
  showApplyBtn = false
  showAddProperty = false
  isErrorMessage = false



  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl(this.id),
      componentType: new FormControl(this.componentType),
      title: new FormControl(this.title),
      style: new FormGroup({}),
      anotherProperties: new FormGroup({}),
    });
    for (const prop in this.style) {
      (<FormGroup> this.form.controls['style']).addControl(prop, new FormControl(this.style[prop]));
    }
    for (const option in this.anotherProperties) {
      (<FormGroup> this.form.controls['anotherProperties']).addControl(option, new FormArray([]));
      for (const item of this.anotherProperties[option]) {
        (<FormArray> (<FormGroup> this.form.controls['anotherProperties']).controls[option]).push(new FormControl(item));
      }
    }
  }

  addSelectOptions(): void {
    (<FormArray> (<FormGroup> this.form.controls['anotherProperties']).controls['options']).push(new FormControl('option'));
    this.dispatchNewStyle()
  }

  deleteOption(controlName): void {
    (<FormArray> (<FormGroup> this.form.controls['anotherProperties']).controls['options']).removeAt(controlName)
    this.dispatchNewStyle()
  }

  addNewStyleProperty(): boolean {
    this.showApplyBtn = true
    const controlName = this.newPropKey ? this.newPropKey.nativeElement.value : null;
    const controlValue = this.newPropValue ? this.newPropValue.nativeElement.value : null;
    if (controlName && controlValue && !Object.keys(this.form.value.style).includes(controlName)){
      this.store.select(getDefaultStyles).subscribe(styles => this.defaultStyles = styles )
      console.log(this.defaultStyles)
      for(const prop in this.defaultStyles){
        if(prop === controlName || this.defaultStyles[prop] === controlName){
          (<FormGroup> this.form.controls['style']).addControl(prop, new FormControl(controlValue));
          return true
        }
      }
    }
    this.isErrorMessage = true
    return false
  }

  deleteStyleProp(controlName): void {
    (<FormGroup> this.form.controls['style']).removeControl(controlName);
    this.dispatchNewStyle()
  }

  deleteComponent(): void {
    const obj: ComponentFields = {
      id: this.form.value.id,
      componentType: this.form.value.componentType,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    }
    this.store.dispatch(deleteComponentAction(obj))
  }

  onSubmit(): void {
    this.addNewStyleProperty()
    this.dispatchNewStyle()
    // console.log('form', this.form.value)
    // const obj: ComponentFields = this.createStyleObject()
    // if(this.form.value.id){
    //   if(this.addNewStyleProperty() || !this.showAddProperty){
    //     this.store.dispatch(setComponentStyleAction(obj));
    //     this.showApplyBtn = false
    //     this.active = false;
    //     this.showAddProperty = false
    //     this.isErrorMessage = false
    //   }
    // }else {
    //   this.store.dispatch(setDefaultComponentStyleAction(obj))
    // }
  }

  dispatchNewStyle(): void{
    const obj: ComponentFields = {
      id: this.form.value.id,
      componentType: this.form.value.componentType,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    }
    if(this.form.value.id){
      this.store.dispatch(setComponentStyleAction(obj))
    }else {
      this.store.dispatch(setDefaultComponentStyleAction(obj))
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

}
