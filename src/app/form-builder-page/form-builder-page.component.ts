import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import {
  getBtnStyleSelector,
  getCheckStyleSelector,
  getGeneralStyle,
  getInputTextStyleSelector,
  getLabelStyleSelector,
  getNewComponentsArray,
  getSelectStyleSelector,
  getTextAreaStyleSelector
} from '../store/component-styles.reduser';
import { LabelComponent } from './shared/components/label.component';
import { InputTextComponent } from './shared/components/input-text.component';
import { ButtonComponent } from './shared/components/button.component';
import { SelectComponent } from './shared/components/select.component';
import { CheckboxComponent } from './shared/components/checkbox.component';
import { TextAreaComponent } from './shared/components/text-area.component';
import { addNewComponentAction} from '../store/component-styles.actions';
import { NewComponent } from '../store/interfaces';

enum ComponentName{
  Button = 'Button',
  Label = 'Label',
  Input = 'Input',
  Select = 'Select',
  Checkbox = 'checkbox',
  TextArea = 'text area'
}

@Component({
  selector: 'app-form-builder-page',
  templateUrl: './form-builder-page.component.html',
  styleUrls: ['./form-builder-page.component.scss']
})
export class FormBuilderPageComponent implements OnInit, AfterViewInit {
  @ViewChild('elemContainer', { read: ViewContainerRef }) elemContainer;
  @ViewChild('defaultContainer', { read: ViewContainerRef }) defaultContainer;

  dragList = [];
  dropList = [];

  tempGeneralStyle;
  tempComponentStyles;
  newTempStyles;
  tempAnotherProperties;
  componentList: Array<any> = [];
  defaultElements = [
    LabelComponent,
    InputTextComponent,
    ButtonComponent,
    SelectComponent,
    CheckboxComponent,
    TextAreaComponent,
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscribe()
  }

  ngAfterViewInit(): void {
    for(const elem of this.defaultElements){
      this.createElement(elem, this.defaultContainer, 'init')
    }
    this.cdr.detectChanges();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.createElement(event.previousContainer.data[event.previousIndex], this.elemContainer, 'drop');
    }
  }

  createElement(element, container, operation): void {
    let factory = null
    let ref = null
    let id = null
    if(operation === 'init'){
      factory = this.componentFactoryResolver.resolveComponentFactory(element);
      ref = container.createComponent(factory);
      id = Math.floor((Math.random() * 1000000) + 1);
      ref.instance.id = id;
      this.dragList.push(ref)
      this.setDefaultStyle(ref)
    }else {
      factory = this.componentFactoryResolver.resolveComponentFactory(element.componentType);
      ref = container.createComponent(factory);
      id = Math.floor((Math.random() * 1000000) + 1);
      ref.instance.id = id;
      this.dropList.push(ref)
      const obj = this.setDefaultStyle(ref)
      this.store.dispatch(addNewComponentAction(obj));
    }
  }


  setDefaultStyle(ref): NewComponent{
    switch (ref.instance.title) {
      case ComponentName.Button:
        const btnStyles$ = this.store.select(getBtnStyleSelector);
        btnStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {};
        break;
      case ComponentName.Checkbox:
        const checkboxStyles$ = this.store.select(getCheckStyleSelector);
        checkboxStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {
          checked: [false]
        };
        break;
      case ComponentName.Input:
        const inputStyles$ = this.store.select(getInputTextStyleSelector);
        inputStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {};
        break;
      case ComponentName.Label:
        const labelStyles$ = this.store.select(getLabelStyleSelector);
        labelStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {};
        break;
      case ComponentName.Select:
        const selectStyles$ = this.store.select(getSelectStyleSelector);
        selectStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {
          options: ['option 1', 'option 2']
        };
        ref.instance.optionList = this.tempAnotherProperties;
        break;
      case ComponentName.TextArea:
        const textAreaStyles$ = this.store.select(getTextAreaStyleSelector);
        textAreaStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {};
        break;
    }
    return {
      id: ref.instance.id,
      title: ref.instance.title,
      style: this.tempComponentStyles,
      anotherProperties: this.tempAnotherProperties
    };
  }

  subscribe(): void{
    this.store.select(getGeneralStyle).subscribe(style => this.tempGeneralStyle = style)
    this.store.select(getBtnStyleSelector).subscribe(style => this.setNewGeneralStyle(style, 'Button'))
    this.store.select(getSelectStyleSelector).subscribe(style => this.setNewGeneralStyle(style, 'Select'))
    this.store.select(getLabelStyleSelector).subscribe(style => this.setNewGeneralStyle(style, 'Label'))
    this.store.select(getInputTextStyleSelector).subscribe(style => this.setNewGeneralStyle(style, 'Input'))
    this.store.select(getCheckStyleSelector).subscribe(style => this.setNewGeneralStyle(style, 'checkbox'))
    this.store.select(getTextAreaStyleSelector).subscribe(style => this.setNewGeneralStyle(style, 'text area'))

    const newElemStyles$ = this.store.select(getNewComponentsArray);
    newElemStyles$.subscribe(comp => {
      for(const object of comp){
        const currentElement = this.dropList.find(elem => elem.instance.id === object.id)
        currentElement.instance.componentStyles$ = object.style;
        currentElement.instance.title = object.title;
        currentElement.instance.optionList = object.anotherProperties;
        this.componentList.push(currentElement)
      }
      for(const component of this.dropList){
        const res = this.componentList.find(item => item.instance.id === component.instance.id)
        if(!res){
          component.destroy()
        }
      }
      this.componentList = []
    });
  }

  setNewGeneralStyle(style, elemName): void {
    if(this.dragList.length > 0){
      const elem = this.dragList.find(item => item.instance.title === elemName)
      elem.instance.componentStyles$ = style
    }
  }

}

// this.dragList = [
//   LabelComponent,
//   InputTextComponent,
//   ButtonComponent,
//   SelectComponent,
//   CheckboxComponent,
//   TextAreaComponent,
// ];



// const btn: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(element);
// const ref = container.createComponent(btn);
// const id = Math.floor((Math.random() * 1000000) + 1);
// ref.instance.id = id;
// ref.changeDetectorRef.detectChanges()
// this.dropList.push(ref)
// this.dragList.push(ref)
// switch (ref.instance.title) {
//   case 'Button':
//     const btnStyles$ = this.store.select(getBtnStyleSelector);
//     btnStyles$.subscribe(styles => this.tempComponentStyles = styles);
//     ref.instance.componentStyles$ = this.tempComponentStyles
//       this.tempAnotherProperties = {};
//     break;
//   case 'checkbox':
//     const checkboxStyles$ = this.store.select(getCheckStyleSelector);
//     checkboxStyles$.subscribe(styles => this.tempComponentStyles = styles);
//     this.tempAnotherProperties = {
//       checked: [false]
//     };
//     break;
//   case 'Input':
//     const inputStyles$ = this.store.select(getInputTextStyleSelector);
//     inputStyles$.subscribe(styles => this.tempComponentStyles = styles);
//     this.tempAnotherProperties = {};
//     break;
//   case 'Label':
//     const labelStyles$ = this.store.select(getLabelStyleSelector);
//     labelStyles$.subscribe(styles => this.tempComponentStyles = styles);
//     this.tempAnotherProperties = {};
//     break;
//   case 'Select':
//     const selectStyles$ = this.store.select(getSelectStyleSelector);
//     selectStyles$.subscribe(styles => this.tempComponentStyles = styles);
//     this.tempAnotherProperties = {
//       options: ['option 1', 'option 2']
//     };
//     ref.instance.optionList = this.tempAnotherProperties;
//     break;
//   case 'text area':
//     const textAreaStyles$ = this.store.select(getTextAreaStyleSelector);
//     textAreaStyles$.subscribe(styles => this.tempComponentStyles = styles);
//     this.tempAnotherProperties = {};
//     break;
// }
// const obj: NewComponent = {
//   id,
//   title: ref.instance.title,
//   style: this.tempComponentStyles,
//   anotherProperties: this.tempAnotherProperties
// };
// this.store.dispatch(addNewComponentAction(obj));
