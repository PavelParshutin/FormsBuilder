import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  template: `<input type="text" [ngStyle]="style" [placeholder]="title" cdkDrag>`,
})
export class InputTextComponent implements OnInit {
  @Input() title = 'Input';
  @Input() style: {}
  @Input() id = '';

  constructor() {}

  ngOnInit(): void {}

}
