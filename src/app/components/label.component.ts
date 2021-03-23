import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  template: `<label>Label</label>`,
  styles: [`label{margin: 10px}`]
})
export class LabelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}