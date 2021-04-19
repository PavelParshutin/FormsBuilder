import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { getDefaultStyles } from '../../../store/component-styles.reduser';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('propName') newPropKey: ElementRef
  @ViewChild('propValue') newPropValue: ElementRef
  @Input() styles: {}
  @Output() newProperty = new EventEmitter()

  showAddProperty = false
  defaultStyles = {}
  form: FormGroup;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      property: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    });
  }

  addNewStyleProperty(): void {
    const controlName = this.newPropKey ? this.newPropKey.nativeElement.value : null;
    const controlValue = this.newPropValue ? this.newPropValue.nativeElement.value : null;
    if (controlName && controlValue && !Object.keys(this.styles).includes(controlName)){
      this.store.select(getDefaultStyles).subscribe(styles => this.defaultStyles = styles )
      for(const prop in this.defaultStyles){
        if(prop === controlName || this.defaultStyles[prop] === controlName){
          this.newProperty.emit(this.form.value)
          break;
        }
      }
    }
  }
}
