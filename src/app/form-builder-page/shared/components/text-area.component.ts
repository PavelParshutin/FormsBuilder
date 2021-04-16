import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  template: `<textarea cdkDrag [ngStyle]="style" [placeholder]="title"></textarea>`,
})
export class TextAreaComponent implements OnInit {
  @Input() title = 'text area';
  @Input() style: {}
  @Input() id = '';

  constructor() {}

  ngOnInit(): void {}

}
