import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `<select name="" #selectElement cdkDrag>
    <option>Option 1</option>
  </select>`,
  styles: [`select{
  width: 30%;
  padding: 10px 15px;
  margin: 10px 30px;
  border: 1px solid black;
  border-radius: 30px;
  outline: none;
}`]
})
export class SelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
