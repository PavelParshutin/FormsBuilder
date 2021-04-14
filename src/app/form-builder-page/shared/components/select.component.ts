import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `<select [ngStyle]="componentStyles$" #selectElement cdkDrag>
    <option>{{title}}</option>
    <option *ngFor="let option of optionList.options">{{option}}</option>
  </select>`,
})
export class SelectComponent implements OnInit {
  @Input() title = 'Select'
  @Input() componentStyles$
  @Input() id = ''
  @Input() optionList = {
    options: []
  }

  constructor() {}

ngOnInit(): void {}
}
