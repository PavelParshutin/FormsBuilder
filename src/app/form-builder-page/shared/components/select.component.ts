import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `<select [ngStyle]="style" #selectElement cdkDrag>
    <option>{{title}}</option>
    <option *ngFor="let option of anotherProperties.options">{{option}}</option>
  </select>`,
})
export class SelectComponent implements OnInit {
  @Input() title = 'Select'
  @Input() style: {}
  @Input() id = ''
  @Input() anotherProperties = {
    options: []
  }

  constructor() {}

ngOnInit(): void {}
}
