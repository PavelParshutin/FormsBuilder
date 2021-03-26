import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getBtnStyleSelector, getInputTextStyleSelector} from '../store/defaultStyles.reduser';
import {Styles} from '../store/interfaces';

@Component({
  selector: 'app-input-text',
  template: `<input type="text" [ngStyle]="componentStyles$" [placeholder]="title" cdkDrag>`,
//   styles: [`input[type=text]{
//   width: 100%;
//   border: 1px solid black;
//   padding: 10px 15px;
//   margin-bottom: 20px;
//   border-radius: 20px;
//   outline: none;
// }`]
})
export class InputTextComponent implements OnInit {
  @Input() title = 'Input'
  @Input() componentStyles$

  defaultStyle$: Observable<any>
  constructor(private store: Store<Styles>) {
  }

  ngOnInit(): void {
    this.defaultStyle$ = this.store.select(getInputTextStyleSelector)
    this.defaultStyle$.subscribe(data => this.componentStyles$ = data)
  }

}
