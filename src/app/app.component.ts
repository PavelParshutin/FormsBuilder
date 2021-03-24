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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  dragList = []
  dropList = []

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2) {
}
  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      // const elem = this.dropList[event.currentIndex - 1]
      // this.renderer.setAttribute(event.item.element.nativeElement, 'id', `id${event.container.data.keys()}`)
      // console.log(event.container.data)
      // console.log(elem)
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


