import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Styles } from '../../store/interfaces';
import { getTextAreaStyleSelector } from '../../store/component-styles.reduser';

@Component({
  selector: 'app-text-area',
  template: `<textarea cdkDrag [ngStyle]="componentStyles$" [placeholder]="title"></textarea>`,

})
export class TextAreaComponent implements OnInit {
  @Input() title = 'text area';
  @Input() componentStyles$;
  @Input() id = '';

  defaultStyle$: Observable<any>;

  constructor(private store: Store<Styles>) {
  }

  ngOnInit(): void {
    this.defaultStyle$ = this.store.select(getTextAreaStyleSelector);
    this.defaultStyle$.subscribe(data => this.componentStyles$ = data);
  }

}
