import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ComponentFactoryResolver,
  ViewContainerRef, Injector, ApplicationRef, EmbeddedViewRef, InjectionToken, ComponentFactory, ComponentRef
} from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {InputTextComponent} from './components/input-text.component';
import {ButtonComponent} from './components/button.component';
import {CheckboxComponent} from './components/checkbox.component';
import {TextAreaComponent} from './components/text-area.component';
import {SelectComponent} from './components/select.component';
import {LabelComponent} from './components/label.component';
import {Store} from '@ngrx/store';

import {
  getBtnStyleSelector,
  getCheckStyleSelector,
  getInputTextStyleSelector,
  getLabelStyleSelector, getNewComponentsArray,
  getSelectStyleSelector, getTextAreaStyleSelector
} from './store/defaultStyles.reduser';
import {addNewComponent, setComponentStyle} from './store/defaultStyle.actions';
import {filter, map, tap} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild('elemContainer', {read: ViewContainerRef}) elemContainer
  dragList = []
  dropList = []

  tempComponentStyles
  newTempStyles
  tempAnotherProperties
  componentList: Array<any> =[]

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, private store: Store) {
  }
  ngOnInit(): void {
    const newElemStyles$ = this.store.select(getNewComponentsArray)
    newElemStyles$.subscribe(elem => this.newTempStyles = elem.filter(object => {
      if(object.style){
        for(let elem of this.componentList){
          if(elem.instance.id === object.id){
            elem.instance.componentStyles$ = object.style
            elem.instance.title = object.title
            elem.instance.optionList = object.anotherProperties
          }
        }
      }
    }))
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.createElement(event.previousContainer.data[event.previousIndex])
    }
  }
  ngAfterViewInit(): void {
    this.dragList = [
      LabelComponent,
      InputTextComponent,
      ButtonComponent,
      SelectComponent,
      CheckboxComponent,
      TextAreaComponent
    ]
  }

  createElement(element): void{
    const btn: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(element)
    const ref = this.elemContainer.createComponent(btn)
    const id = Math.floor((Math.random() * 1000000) + 1)
    ref.instance.id = id

    this.componentList.push(ref)
    switch (ref.instance.title){
      case 'Button':
        const btnStyles$ = this.store.select(getBtnStyleSelector)
        btnStyles$.subscribe(styles => this.tempComponentStyles = styles)
        this.tempAnotherProperties = {}
        break
      case 'checkbox':
        const checkboxStyles$ = this.store.select(getCheckStyleSelector)
        checkboxStyles$.subscribe(styles => this.tempComponentStyles = styles)
        this.tempAnotherProperties = {}
        break
      case 'Input':
        const inputStyles$ = this.store.select(getInputTextStyleSelector)
        inputStyles$.subscribe(styles => this.tempComponentStyles = styles)
        this.tempAnotherProperties = {}
        break
      case 'Label':
        const labelStyles$ = this.store.select(getLabelStyleSelector)
        labelStyles$.subscribe(styles => this.tempComponentStyles = styles)
        this.tempAnotherProperties = {}
        break
      case 'Select':
        const selectStyles$ = this.store.select(getSelectStyleSelector)
        selectStyles$.subscribe(styles => this.tempComponentStyles = styles)
        this.tempAnotherProperties = {
          options: ['option 1', 'option 2']
        }
        ref.instance.optionList = this.tempAnotherProperties
        break
      case 'text area':
        const textAreaStyles$ = this.store.select(getTextAreaStyleSelector)
        textAreaStyles$.subscribe(styles => this.tempComponentStyles = styles)
        this.tempAnotherProperties = {}
        break
      }
    const obj = {
      id,
      title: ref.instance.title,
      style: this.tempComponentStyles,
      anotherProperties: this.tempAnotherProperties
    }
    this.store.dispatch(addNewComponent(obj))
  }
}
