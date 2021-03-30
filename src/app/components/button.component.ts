import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {getBtnStyleSelector} from '../store/defaultStyles.reduser';
import {Styles} from '../store/interfaces';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-button',
  template: `<button cdkDrag [ngStyle]="componentStyles$">{{title}}</button>`,
})
export class ButtonComponent implements OnInit {

  @Input() componentStyles$: Observable<any>
  @Input() title = 'Button'
  @Input() id = ''

  defaultStyle$: Observable<any>
  constructor(private store: Store<Styles>) {
  }

  ngOnInit(): void {
    this.defaultStyle$ = this.store.select(getBtnStyleSelector)
    this.defaultStyle$.subscribe(data => this.componentStyles$ = data)
  }

}
