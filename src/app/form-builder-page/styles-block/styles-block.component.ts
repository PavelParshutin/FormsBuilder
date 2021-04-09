import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import {setComponentStyleAction, setGeneralStyle} from '../../store/component-styles.actions';
import { NewComponent } from "../../store/interfaces";


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
    //console.log(this.anotherProperties.options)
    //this.anotherProperties.options.push()
    // this.tempProperties.options = this.anotherProperties.options
    // this.tempProperties.options.push('new option')
    // this.anotherProperties = this.tempProperties
    // console.log(this.tempProperties)
    //(<Array<any>>this.anotherProperties.options).push('new option')
  }

  onSubmit(): void {
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

}
