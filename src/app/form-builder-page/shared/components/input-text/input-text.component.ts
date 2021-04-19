import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  @Input() title = 'Input';
  @Input() style: {};
  @Input() id = '';

  constructor() {}

  ngOnInit(): void {}

}
