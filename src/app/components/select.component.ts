import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Styles} from '../store/interfaces';
import {getInputTextStyleSelector, getSelectStyleSelector} from '../store/defaultStyles.reduser';

@Component({
  selector: 'app-select',
  template: `<select [ngStyle]="componentStyles$" #selectElement cdkDrag>
    <option>{{title}}</option>
  </select>`,
})
export class SelectComponent implements OnInit {
  @Input() title = 'option 1'
  @Input() componentStyles$

  defaultStyle$: Observable<any>
  constructor(private store: Store<Styles>) {
}

ngOnInit(): void {
  this.defaultStyle$ = this.store.select(getSelectStyleSelector)
  this.defaultStyle$.subscribe(data => this.componentStyles$ = data)
}
}
