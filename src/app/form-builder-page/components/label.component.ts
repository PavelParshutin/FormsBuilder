import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Styles } from '../../store/interfaces';
import { getLabelStyleSelector } from '../../store/component-styles.reduser';

@Component({
  selector: 'app-label',
  template: `<label [ngStyle]="componentStyles$" cdkDrag>{{title}}</label>`,

})
export class LabelComponent implements OnInit {
  @Input() title = 'Label'
  @Input() componentStyles$
  @Input() id = ''

    defaultStyle$: Observable<any>
      constructor(private store: Store<Styles>) {
}

ngOnInit(): void {
  this.defaultStyle$ = this.store.select(getLabelStyleSelector)
  this.defaultStyle$.subscribe(data => this.componentStyles$ = data)
}
}
