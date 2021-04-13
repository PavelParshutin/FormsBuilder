import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  getBtnStyleSelector, getCheckStyleSelector, getGeneralStyle,
  getInputTextStyleSelector,
  getLabelStyleSelector, getSelectStyleSelector, getTextAreaStyleSelector
} from "../../../../store/component-styles.reduser";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {NewComponent} from "../../../../store/interfaces";
import {
  setNewGeneralBtnStyle, setNewGeneralCheckboxStyle, setNewGeneralInputStyle,
  setNewGeneralLabelStyle,
  setNewGeneralSelectStyle, setNewGeneralTextAreaStyle
} from "../../../../store/component-styles.actions";

@Component({
  selector: 'app-general-style',
  templateUrl: './general-style.component.html',
  styleUrls: ['./general-style.component.css']
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
        type: new FormControl()
      }),
    });
    for (const prop in this.style) {
      (<FormGroup> this.form.controls['style']).addControl(prop, new FormControl(this.style[prop]));
    }
  }
  // createStyleObject(){
  //   return {
  //     // title: this.form.value.title,
  //     // style: this.form.value.style
  //     true
  //   };
  // }

  isVisibleInput(): void {
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


  deleteStyleProp(key: unknown) {

  }

  onSubmit() {
    // const obj = this.createStyleObject()
    console.log(this.form)
    switch (this.form.value.title){
      case 'Button':
        this.store.dispatch(setNewGeneralBtnStyle(this.form.value.style))
        break;
      case 'Label':
        this.store.dispatch(setNewGeneralLabelStyle(this.form.value.style))
        break;
      case 'Select':
        this.store.dispatch(setNewGeneralSelectStyle(this.form.value.style))
        break;
      case 'Input':
        this.store.dispatch(setNewGeneralInputStyle(this.form.value.style))
        break;
      case 'Checkbox':
        this.store.dispatch(setNewGeneralCheckboxStyle(this.form.value.style))
        break;
      case 'text area':
        this.store.dispatch(setNewGeneralTextAreaStyle(this.form.value.style))
        break;
    }

  }
}
