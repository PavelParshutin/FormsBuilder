import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  template: `<textarea></textarea>`,
  styles: [`textarea{
  display: block;
  width: 100%;
  border: 1px solid black;
  border-radius: 15px;
  outline: none;
  padding: 10px 15px;
    margin: 10px auto;
}`]
})
export class TextAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
