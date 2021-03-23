import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button cdkDrag>Button</button>`,
  styles: [`button{
    border: 1px solid black;
    outline: none;
    padding: 10px 15px;
    font-size: 14px;
    color: black;
    border-radius: 20px;
    cursor: pointer;
    margin: 10px;
  }`]
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
