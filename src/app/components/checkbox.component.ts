import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template:`<span>
  <input id="inputCheckbox" type="checkbox">
  <label for="inputCheckbox">checkbox</label>
</span>`,
  styles: [`input[type=checkbox]{
  margin: 5px;
}`]
})
export class CheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
