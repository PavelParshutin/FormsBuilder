import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';

import {getDefaultStyles} from '../../../../store/component-styles.reduser';
import {map} from "rxjs/operators";
import {addNewStyleProperty} from "../../../../store/component-styles.actions";

@Component({
  selector: 'app-style-property-form',
  templateUrl: './style-property-form.component.html',
  styleUrls: ['./style-property-form.component.scss']
})
export class StylePropertyFormComponent implements OnInit {
  @Input() id

  form: FormGroup
  defaultStyles
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
      propName: new FormControl(''),
      propValue: new FormControl('')
    })
  }

  addNewStyle() {
    this.store.select(getDefaultStyles).subscribe(style => this.defaultStyles = style)
    for(const prop in this.defaultStyles){
      if(prop === this.form.value.propName || this.defaultStyles[prop] === this.form.value.propName){
        console.log(prop)
        console.log(this.id)
        console.log(this.form)
        this.store.dispatch(addNewStyleProperty({id: this.id, style: this.form.value}))
        break;
      }
    }
  }
}
