import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-button',
  template: `<button cdkDrag [ngStyle]="componentStyles$">{{title}}</button>`,
})
export class ButtonComponent implements OnInit {

  @Input() componentStyles$: Observable<any>
  @Input() title = 'Button'
  @Input() id = ''

  constructor() {
  }

  ngOnInit(): void {
  }

}
