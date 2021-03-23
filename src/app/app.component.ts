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
import {
  ComponentPortal,
  DomPortal,
  Portal
} from '@angular/cdk/portal';
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

  @ViewChild('labelElement') labelElement: ElementRef<HTMLElement>
  @ViewChild('InputTextElement') inputTextElement: ElementRef<HTMLElement>
  @ViewChild('btnStandard') btnStandard: ElementRef<HTMLElement>
  @ViewChild('btnBlue') btnBlue: ElementRef<HTMLElement>
  @ViewChild('checkboxElement') checkboxElement: ElementRef<HTMLElement>
  @ViewChild('selectElement') selectElement: ElementRef<HTMLElement>
  @ViewChild('textAreaElement') textAreaElement: ElementRef<HTMLElement>

  @ViewChild('elemContainer', {read: ViewContainerRef}) elemContainer

  dragList = []
  dropList = []

  componentRef: ComponentRef<any>

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2,) {
}
  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return
    } else {
      // copyArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex);
      this.createComponent(event.item.element.nativeElement.localName)
      console.log(event.item)
    }
  }

  createComponent(elemName){
    switch (elemName){
      case 'button':
        const btn: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(ButtonComponent)
        this.componentRef = this.elemContainer.createComponent(btn)
        break
      case 'input':
        const inputText: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent)
        this.componentRef = this.elemContainer.createComponent(inputText)
        break
      case 'span':
        const checkBox: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(CheckboxComponent)
        this.componentRef = this.elemContainer.createComponent(checkBox)
        break
      case 'textarea':
        const textArea: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(TextAreaComponent)
        this.componentRef = this.elemContainer.createComponent(textArea)
        break
      case 'select':
        const select: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(SelectComponent)
        this.componentRef = this.elemContainer.createComponent(select)
        break
      case 'label':
        const label: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(LabelComponent)
        this.componentRef = this.elemContainer.createComponent(label)
        break
    }
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
  }

  ngAfterViewInit(): void {
    this.dragList = [
      this.labelElement.nativeElement,
      this.inputTextElement,
      this.btnBlue.nativeElement,
      this.btnStandard,
      this.checkboxElement,
      this.selectElement,
      this.textAreaElement,
      new InputTextComponent(),
      new ButtonComponent()
    ]
  }

}
