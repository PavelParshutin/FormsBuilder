import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  template: `<label [ngStyle]="componentStyles$" cdkDrag>{{title}}</label>`,
})
export class LabelComponent implements OnInit {
  @Input() title = 'Label'
  @Input() componentStyles$
  @Input() id = ''

  constructor() {}

  ngOnInit(): void {}
}
