import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  template: `<textarea cdkDrag [ngStyle]="componentStyles$" [placeholder]="title"></textarea>`,
})
export class TextAreaComponent implements OnInit {
  @Input() title = 'text area';
  @Input() componentStyles$;
  @Input() id = '';

  constructor() {}

  ngOnInit(): void {}

}
