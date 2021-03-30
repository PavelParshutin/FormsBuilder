import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {setComponentStyle} from '../store/defaultStyle.actions';

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

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = new FormGroup({
    })
    for(const key in this.elementsList){
      if(key === 'title'){
        this.form.addControl(key, new FormControl(this.elementsList[key]))
      }else if(key === 'style'){
        for(const item in this.elementsList[key]){
          this.form.addControl(item.toString(), new FormControl(this.elementsList[key][item]))
        }
      }else if(key === 'id'){
        this.form.addControl(key, new FormControl(this.elementsList[key]))
      }else if (key === 'anotherProperties'){
        for(const option in this.elementsList[key]){
          if(option === 'options'){
            console.log(option)
            for(const i of this.elementsList[key][option]){
              console.log(i)
              this.form.addControl(i, new FormControl(i))
              // this.form.addControl(option, new FormArray([new FormControl(i)]))
            }
          }
        }
      }
    }
  }
  onSubmit(): void{
    let properties = {}
    this.active = false
    const {id, title, ...style} = this.form.value
    if(this.form.value.title === 'select'){
      properties = {
        options: [this.form.value['option 1']]
      }
    }

    const obj = {
      id: id,
      title: title,
      style: style,
      anotherProperties: {}
    }
    console.log(this.form.value)
    this.store.dispatch(setComponentStyle(obj))
  }

}
