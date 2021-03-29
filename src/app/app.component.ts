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

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, private store: Store) {
  }
  ngOnInit(): void {

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
    const id = Math.floor((Math.random()*1000000)+1)
    //console.log('tittle is', ref.instance.title)
    switch (ref.instance.title){
      case 'Button':
        const btnStyles$ = this.store.select(getBtnStyleSelector)
        btnStyles$.subscribe(styles => this.tempComponentStyles = styles)
        break
      case 'checkbox':
        const checboxStyles$ = this.store.select(getCheckStyleSelector)
        checboxStyles$.subscribe(styles => this.tempComponentStyles = styles)
        break
      case 'Input':
        const inputStyles$ = this.store.select(getInputTextStyleSelector)
        inputStyles$.subscribe(styles => this.tempComponentStyles = styles)
        break
      case 'Label':
        const labelStyles$ = this.store.select(getLabelStyleSelector)
        labelStyles$.subscribe(styles => this.tempComponentStyles = styles)
        break
      case 'Select':
        const selectStyles$ = this.store.select(getSelectStyleSelector)
        selectStyles$.subscribe(styles => this.tempComponentStyles = styles)
        break
      case 'text area':
        const textAreaStyles$ = this.store.select(getTextAreaStyleSelector)
        textAreaStyles$.subscribe(styles => this.tempComponentStyles = styles)
        break
      }
      const obj = {
        id,
        title: ref.instance.title,
        style: this.tempComponentStyles
      }
    this.store.dispatch(addNewComponent(obj))


  }

}




// elementsStylesList = []
// clicked = false
// stylelist = []

//ref.instance.componentStyles$ = {border: '3px solid blue'}
//this.store.select(getStylesSelector).subscribe(data => console.log('this is daa',data))
// if(ref.instance.title = 'button'){
//   const btnStyle$ = this.store.select(getBtnStyleSelector)
//   btnStyle$.subscribe(data => this.tempBtnStyle = data)
// }
// this.elementsList.push({
//   id: id,
//   title: ref.instance.title,
//   style: this.tempBtnStyle
// })
// console.log('btnbtn',this.tempBtnStyle)
// const elemTitle = ref.instance.title
// const elemStyle = ref.instance.componentStyles$
// const temp = {
//   [elemTitle]: elemStyle
// }
// this.elemDataForAccordion.push(temp)
// this.store.dispatch(addNewComponent(this.elementsList))
