import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  template: `<label [ngStyle]="style" cdkDrag>{{title}}</label>`,
})
export class LabelComponent implements OnInit {
  @Input() title = 'Label'
  @Input() style: {}
  @Input() id = ''

  constructor() {}

  ngOnInit(): void {}
}
