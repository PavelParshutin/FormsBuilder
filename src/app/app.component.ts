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

import {Observable} from 'rxjs';

import {getBtnStyleSelector, getInputTextStyleSelector} from './store/defaultStyles.reduser';
import {Styles} from './store/interfaces';
import {addNewComponent} from './store/defaultStyle.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild('elemContainer', {read: ViewContainerRef}) elemContainer
  dragList = []
  dropList = []

  elementsStylesList = []
  elementsList = []
  elemDataForAccordion = []

  clicked = true
  btnStyle$: Observable<any>
  inputTextStyles$: Observable<any>
  stylelist = []
  tempComponentStyles

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, private store: Store) {
  }
  ngOnInit(): void {
    this.btnStyle$ = this.store.select(getBtnStyleSelector)
    this.inputTextStyles$ = this.store.select(getInputTextStyleSelector)
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

  createElement(element){
    const btn: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(element)
    const ref = this.elemContainer.createComponent(btn)
    const id = Math.floor((Math.random()*1000000)+1)
    console.log('tittle is', ref.instance.title)
    switch (ref.instance.title){
      case 'Button':
        const elemStyles$ = this.store.select(getBtnStyleSelector)
        elemStyles$.subscribe(styles => this.tempComponentStyles = styles)
      }
      this.elementsList.push({
        id,
        title: ref.instance.title,
        style: this.tempComponentStyles
      })
    this.store.dispatch(addNewComponent(this.elementsList))


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

  }

  testBtn() {
    const style:Styles = {
      btnStyle:{ border: '3px solid blue',
        padding: '10px 10px',
        backgroundColor: 'yellow'
      }
    }
    const newstyle = {
      border: '3px solid red',
      // padding: '10px 10px',
      // backgroundColor: 'yellow'
    }
    console.log(this.stylelist[0])
    //this.stylelist[0].instance.componentStyles$.subscribe( () => this.store.dispatch(setStyle(style)))
    console.log('elem list', this.elementsList)
    this.elementsList[0].instance.componentStyles$ = newstyle
    this.elementsStylesList.push(this.elementsList[0].instance.componentStyles$)
  }


}








//
// @ViewChild('labelElement') labelElement: ElementRef<HTMLElement>
// @ViewChild('InputTextElement') inputTextElement: ElementRef<HTMLElement>
// @ViewChild('btnStandard') btnStandard: ElementRef<HTMLElement>
// @ViewChild('btnBlue') btnBlue: ElementRef<HTMLElement>
// @ViewChild('checkboxElement') checkboxElement: ElementRef<HTMLElement>
// @ViewChild('selectElement') selectElement: ElementRef<HTMLElement>
// @ViewChild('textAreaElement') textAreaElement: ElementRef<HTMLElement>
// @ViewChild('form') form: ElementRef<HTMLElement>
//
// @ViewChild('elemContainer', {read: ViewContainerRef}) elemContainer
// componentRef: ComponentRef<any>


// const elem = this.dropList[event.currentIndex - 1]
// this.renderer.setAttribute(event.item.element.nativeElement, 'id', `id${event.container.data.keys()}`)
// console.log(event.container.data)
// console.log(elem)

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //     return
  //   } else {
  //     this.createComponent(event.item.element.nativeElement.localName)
  //     console.log(event.item)
  //     this.dropList.push(event.item.element.nativeElement.localName)
  //   }
  // }

  // createComponent(elemName){
  //   switch (elemName){
  //     case 'button':
  //       const btn: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(ButtonComponent)
  //       const ref = this.componentRef = this.elemContainer.createComponent(btn)
  //       break
  //     case 'input':
  //       const inputText: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent)
  //       this.componentRef = this.elemContainer.createComponent(inputText)
  //       break
  //     case 'span':
  //       const checkBox: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(CheckboxComponent)
  //       this.componentRef = this.elemContainer.createComponent(checkBox)
  //       break
  //     case 'textarea':
  //       const textArea: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(TextAreaComponent)
  //       this.componentRef = this.elemContainer.createComponent(textArea)
  //       break
  //     case 'select':
  //       const select: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(SelectComponent)
  //       this.componentRef = this.elemContainer.createComponent(select)
  //       break
  //     case 'label':
  //       const label: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(LabelComponent)
  //       this.componentRef = this.elemContainer.createComponent(label)
  //       break
  //   }
    // switch (elemName){
    //   case 'button':
    //     this.elem = this.renderer.createElement(elemName)
    //     const buttonText = this.renderer.createText('button');
    //     this.renderer.appendChild(this.elem, buttonText);
    //     this.renderer.addClass(this.elem, 'btn')
    //     this.renderer.appendChild(this.elRef.nativeElement, this.elem)
    //     break
    //   case 'input':
    //     this.elem = this.renderer.createElement(elemName)
    //     this.renderer.appendChild(this.elRef.nativeElement, this.elem)
    //     break
    //   case 'textarea':
    //     this.elem = this.renderer.createElement(elemName)
    //     this.renderer.appendChild(this.elRef.nativeElement, this.elem)
    //     break
    //   case 'label':
    //     this.elem = this.renderer.createElement(elemName)
    //     const text = this.renderer.createText('Label')
    //     this.renderer.appendChild(this.elem, text)
    //     this.renderer.appendChild(this.elRef.nativeElement, this.elem)
    // }
  //}


