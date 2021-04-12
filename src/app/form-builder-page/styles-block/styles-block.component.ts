import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  updateOptions,
  setComponentStyleAction,
  setGeneralStyle,
  addNewStyleProperty, deleteComponent
} from '../../store/component-styles.actions';
import { NewComponent } from '../../store/interfaces';
import {getDefaultStyles} from "../../store/component-styles.reduser";


@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.css']
})
export class StylesBlockComponent implements OnInit {
  form: FormGroup;

  @Input() id;
  @Input() title;
  @Input() style;
  @Input() anotherProperties;

  active: boolean = false;
  showStyles = false;
  showTitle = false;
  isAddStyleProp = false
  defaultStyles

  @ViewChild('propName') newPropKey: ElementRef
  @ViewChild('propValue')newPropValue: ElementRef

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl(this.id),
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
    const obj: NewComponent = {
      id: this.form.value.id,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    };
    this.store.dispatch(updateOptions(obj))
  }

  deleteOption(controlName): void {
    (<FormArray> (<FormGroup> this.form.controls['anotherProperties']).controls['options']).removeAt(controlName)
    const obj: NewComponent = {
      id: this.form.value.id,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    };
    this.store.dispatch(updateOptions(obj))
  }

  addNewStyleProperty(): void {
    const controlName = this.newPropKey ? this.newPropKey.nativeElement.value : null;
    const controlValue = this.newPropValue ? this.newPropValue.nativeElement.value : null;
    if (controlName && controlValue && !Object.keys(this.form.value.style).includes(controlName)){
      this.store.select(getDefaultStyles).subscribe(styles => this.defaultStyles = styles )
      for(const prop in this.defaultStyles){
        if(prop === controlName || this.defaultStyles[prop] === controlName){
          (<FormGroup> this.form.controls['style']).addControl(prop, new FormControl(controlValue));
          break;
        }
      }
    }
  }

  deleteStyleProp(controlName): void {
    (<FormGroup> this.form.controls['style']).removeControl(controlName);
    const obj: NewComponent = {
      id: this.form.value.id,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    };
    this.store.dispatch(setComponentStyleAction(obj))
  }

  deleteComponent(): void {
    const obj: NewComponent = {
      id: this.form.value.id,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    };
    this.store.dispatch(deleteComponent(obj))
  }

  onSubmit(): void {
    this.addNewStyleProperty()

    const obj: NewComponent = {
      id: this.form.value.id,
      title: this.form.value.title,
      style: this.form.value.style,
      anotherProperties: this.form.value.anotherProperties,
    };
    this.active = false;
    if (obj.id){
      this.store.dispatch(setComponentStyleAction(obj));
    }else {
      this.store.dispatch(setGeneralStyle(obj));
    }
  }

  isVisibleInput(): void {
    this.isAddStyleProp = !this.isAddStyleProp
    this.active = !this.active
  }


}
