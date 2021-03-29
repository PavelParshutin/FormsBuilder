import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.css']
})
export class StylesBlockComponent implements OnInit {
  form: FormGroup
  @Input() elementsList
  active: boolean = false
  showStyles = false

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({})
    for(const key in this.elementsList){
      if(key === 'title'){
        this.form.addControl(key, new FormControl(this.elementsList[key]))
      }else if(key === 'style'){
        for(const item in this.elementsList[key]){
          this.form.addControl(item.toString(), new FormControl(this.elementsList[key][item]))
        }
      }else if(key === 'id'){
        this.form.addControl(key, new FormControl(this.elementsList[key]))
      }
    }
  }
  onSubmit(): void{
    console.log('submit', this.form)
    this.active = false
  }

}
