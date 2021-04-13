import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import {CdkDragDrop, copyArrayItem, moveItemInArray} from '@angular/cdk/drag-drop';

import {
  getBtnStyleSelector,
  getCheckStyleSelector, getGeneralStyle,
  getInputTextStyleSelector, getLabelStyleSelector,
  getNewComponentsArray, getSelectStyleSelector, getTextAreaStyleSelector
} from '../store/component-styles.reduser';
import { LabelComponent } from './shared/components/label.component';
import { InputTextComponent } from './shared/components/input-text.component';
import { ButtonComponent } from './shared/components/button.component';
import { SelectComponent } from './shared/components/select.component';
import { CheckboxComponent } from './shared/components/checkbox.component';
import { TextAreaComponent } from './shared/components/text-area.component';
import { addNewComponentAction} from '../store/component-styles.actions';
import {NewComponent} from '../store/interfaces';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-form-builder-page',
  templateUrl: './form-builder-page.component.html',
  styleUrls: ['./form-builder-page.component.scss']
})
export class FormBuilderPageComponent implements OnInit, AfterViewInit {
  @ViewChild('elemContainer', { read: ViewContainerRef }) elemContainer;
  @ViewChild('defaultContainer', { read: ViewContainerRef }) defaultContainer;
  // @ViewChild('templateRef') templateContainer: TemplateRef<any>;
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store, private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscribe()
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.createElement(event.previousContainer.data[event.previousIndex], this.elemContainer, 'drop');
    }
  }

  ngAfterViewInit(): void {
    // this.dragList = [
    //   LabelComponent,
    //   InputTextComponent,
    //   ButtonComponent,
    //   SelectComponent,
    //   CheckboxComponent,
    //   TextAreaComponent,
    // ];
    for(const elem of this.defaultElements){
      this.createElement(elem, this.defaultContainer, 'init')
    }
    this.cdr.detectChanges();
  }

  createElement(element, container?, typeOperation?): void {
    let btn = null
    let ref = null
    let id = null
    if(typeOperation === 'init'){
      btn = this.componentFactoryResolver.resolveComponentFactory(element);
      ref = container.createComponent(btn);
      id = Math.floor((Math.random() * 1000000) + 1);
      ref.instance.id = id;
      this.dragList.push(ref)
      this.setDefaultstyle(ref)
    }else {
      btn = this.componentFactoryResolver.resolveComponentFactory(element.componentType);
      ref = container.createComponent(btn);
      id = Math.floor((Math.random() * 1000000) + 1);
      ref.instance.id = id;
      this.dropList.push(ref)
      const obj = this.setDefaultstyle(ref)
      this.store.dispatch(addNewComponentAction(obj));
    }
  }


  setDefaultstyle(ref){
    switch (ref.instance.title) {
      case 'Button':
        const btnStyles$ = this.store.select(getBtnStyleSelector);
        btnStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {};
        break;
      case 'checkbox':
        const checkboxStyles$ = this.store.select(getCheckStyleSelector);
        checkboxStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {
          checked: [false]
        };
        break;
      case 'Input':
        const inputStyles$ = this.store.select(getInputTextStyleSelector);
        inputStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {};
        break;
      case 'Label':
        const labelStyles$ = this.store.select(getLabelStyleSelector);
        labelStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {};
        break;
      case 'Select':
        const selectStyles$ = this.store.select(getSelectStyleSelector);
        selectStyles$.subscribe(styles => this.tempComponentStyles = styles);
        ref.instance.componentStyles$ = this.tempComponentStyles
        this.tempAnotherProperties = {
          options: ['option 1', 'option 2']
        };
        ref.instance.optionList = this.tempAnotherProperties;
        break;
      case 'text area':
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

  subscribe(){
    const generalStyles$ = this.store.select(getGeneralStyle);
    generalStyles$.subscribe(style => this.tempGeneralStyle = style)

    const generalBtnStyles$ = this.store.select(getBtnStyleSelector);
    generalBtnStyles$.subscribe(style => this.setNewGeneralStyle(style, 'Button'))
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
  setNewGeneralStyle(style, elemName){
    if(this.dragList.length > 0){
      const elem = this.dragList.find(item => item.instance.title === elemName)
      elem.instance.componentStyles$ = style
    }
  }

}




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
//this.store.dispatch(addNewComponentAction(obj));
