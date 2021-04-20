import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  setNewComponentStyleAction,
  deleteComponentAction,
  setDefaultComponentStyleAction
} from '../../store/component-styles.actions';
import { ComponentFields } from '../../store/interfaces';


@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.scss']
})
export class StylesBlockComponent implements OnInit {

  @Input() id;
  @Input() componentType;
  @Input() title;
  @Input() style;
  @Input() anotherProperties;

  form: FormGroup;

  showStyleBlock = false
  showApplyBtn = false

  constructor(private store: Store) { }

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

  addNewStyleProperty(styleProp): void {
    this.showApplyBtn = true
    const {property, value} = styleProp;
    (<FormGroup> this.form.controls['style']).addControl(property, new FormControl(value));
  }

  deleteStyleProp(controlName): void {
    (<FormGroup> this.form.controls['style']).removeControl(controlName);
    this.dispatchNewStyle()
  }

  deleteComponent(): void {
    const obj: ComponentFields = this.createObj()
    this.store.dispatch(deleteComponentAction(obj))
  }

  onSubmit(): void {
    this.dispatchNewStyle()
  }

  dispatchNewStyle(): void {
    const obj: ComponentFields = this.createObj()
    if(this.form.value.id) {
      this.store.dispatch(setNewComponentStyleAction(obj))
    } else {
      this.store.dispatch(setDefaultComponentStyleAction(obj))
    }
  }

  createObj(): ComponentFields {
    return {
      id: this.form.value.id,
      componentType: this.form.value.componentType,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    }
  }

}
