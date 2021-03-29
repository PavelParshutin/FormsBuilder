import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getBtnStyleSelector, getInputTextStyleSelector} from '../store/defaultStyles.reduser';
import {Styles} from '../store/interfaces';
import {} from 'events';


@Component({
  selector: 'app-input-text',
  template: `<input type="text" [ngStyle]="componentStyles$" [placeholder]="title" cdkDrag>`,
})
export class InputTextComponent implements OnInit {
  @Input() title = 'Input'
  @Input() componentStyles$
  @Input() active = false
  @Output() visability = new EventEmitter

  defaultStyle$: Observable<any>
  constructor(private store: Store<Styles>) {
  }

  ngOnInit(): void {
    this.defaultStyle$ = this.store.select(getInputTextStyleSelector)
    this.defaultStyle$.subscribe(data => this.componentStyles$ = data)
  }

  setActive(value){
    this.visability.emit(value)
  }
}
