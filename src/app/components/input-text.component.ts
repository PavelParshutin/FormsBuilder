import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  template: `<input type="text" placeholder="Input" cdkDrag>`,
  styles: [`input[type=text]{
  width: 100%;
  border: 1px solid black;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 20px;
  outline: none;
}`]
})
export class InputTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
