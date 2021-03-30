import {Component, Input, OnInit} from '@angular/core';
import {getBtnStyleSelector, getCheckStyleSelector} from '../store/defaultStyles.reduser';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-checkbox',
  template:`<span>
  <input [ngStyle]="componentStyles$" id="inputCheckbox" type="checkbox">
  <label for="inputCheckbox" cdkDrag>{{title}}</label>
</span>`,
})
export class CheckboxComponent implements OnInit {
  @Input() title = 'checkbox'
  @Input() componentStyles$
  @Input() id = ''

  defaultStyle$: Observable<any>
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.defaultStyle$ = this.store.select(getCheckStyleSelector)
    this.defaultStyle$.subscribe(data => this.componentStyles$ = data)
  }

}
