import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
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
