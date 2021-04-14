import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template:`<span>
  <input [ngStyle]="componentStyles$" id="inputCheckbox" type="checkbox">
  <label for="inputCheckbox" cdkDrag>{{title}}</label>
</span>`,
})
export class CheckboxComponent implements OnInit {
  @Input() title = 'checkbox'
  @Input() componentStyles$
  @Input() id = ''

  constructor() { }

  ngOnInit(): void {}

}
