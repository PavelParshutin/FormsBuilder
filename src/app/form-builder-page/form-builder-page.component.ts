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
  getCheckStyleSelector, getComponents, getGeneralStyle,
  getInputTextStyleSelector, getLabelStyleSelector,
  getNewComponentsArray, getSelectStyleSelector, getTextAreaStyleSelector
} from '../store/component-styles.reduser';
import { LabelComponent } from './components/label.component';
import { InputTextComponent } from './components/input-text.component';
import { ButtonComponent } from './components/button.component';
import { SelectComponent } from './components/select.component';
import { CheckboxComponent } from './components/checkbox.component';
import { TextAreaComponent } from './components/text-area.component';
import {addComponent, addNewComponentAction} from '../store/component-styles.actions';
import {NewComponent} from '../store/interfaces';
import {ComponentPortal} from "@angular/cdk/portal";

@Component({
  selector: 'app-form-builder-page',
  templateUrl: './form-builder-page.component.html',
  styleUrls: ['./form-builder-page.component.css']
})
export class FormBuilderPageComponent implements OnInit, AfterViewInit {
  @ViewChild('elemContainer', { read: ViewContainerRef }) elemContainer;
  dragList = [];
  dropList = [];

  tempGeneralStyle;
  tempComponentStyles;
  newTempStyles;
  tempAnotherProperties;
  componentList: Array<any> = [];

  componentPortal: ComponentPortal<any>

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store, private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const generalStyles$ = this.store.select(getGeneralStyle);
    generalStyles$.subscribe(style => this.tempGeneralStyle = style)
    const newElemStyles$ = this.store.select(getNewComponentsArray);
    newElemStyles$.subscribe(comp => {
      for(const object of comp){
        const currentElement = this.dropList.find(elem => elem.instance.id === object.id)
        currentElement.instance.componentStyles$ = object.style;
        currentElement.instance.title = object.title;
        currentElement.instance.optionList = object.anotherProperties;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // copyArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex);
      this.createElement(event.previousContainer.data[event.previousIndex]);
    }
  }

  ngAfterViewInit(): void {
    this.dragList = [
      LabelComponent,
      InputTextComponent,
      ButtonComponent,
      SelectComponent,
      CheckboxComponent,
      TextAreaComponent,
    ];
    this.cdr.detectChanges();
  }

  createElement(element): void {
    const btn: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(element);
    // const ref = this.viewContainerRef.createComponent(btn);
    const ref = this.elemContainer.createComponent(btn);
    const id = Math.floor((Math.random() * 1000000) + 1);
    ref.instance.id = id;
    //this.componentList.push(ref);
    this.dropList.push(ref)
    switch (ref.instance.title) {
      case 'Button':
        const btnStyles$ = this.store.select(getBtnStyleSelector);
        btnStyles$.subscribe(styles => this.tempComponentStyles = styles);
        this.tempAnotherProperties = {};
        break;
      case 'checkbox':
        const checkboxStyles$ = this.store.select(getCheckStyleSelector);
        checkboxStyles$.subscribe(styles => this.tempComponentStyles = styles);
        this.tempAnotherProperties = {
          checked: [false]
        };
        break;
      case 'Input':
        const inputStyles$ = this.store.select(getInputTextStyleSelector);
        inputStyles$.subscribe(styles => this.tempComponentStyles = styles);
        this.tempAnotherProperties = {};
        break;
      case 'Label':
        const labelStyles$ = this.store.select(getLabelStyleSelector);
        labelStyles$.subscribe(styles => this.tempComponentStyles = styles);
        this.tempAnotherProperties = {};
        break;
      case 'Select':
        const selectStyles$ = this.store.select(getSelectStyleSelector);
        selectStyles$.subscribe(styles => this.tempComponentStyles = styles);
        this.tempAnotherProperties = {
          options: ['option 1', 'option 2']
        };
        ref.instance.optionList = this.tempAnotherProperties;
        break;
      case 'text area':
        const textAreaStyles$ = this.store.select(getTextAreaStyleSelector);
        textAreaStyles$.subscribe(styles => this.tempComponentStyles = styles);
        this.tempAnotherProperties = {};
        break;
    }
    const obj: NewComponent = {
      id,
      title: ref.instance.title,
      style: this.tempComponentStyles,
      anotherProperties: this.tempAnotherProperties
    };
    this.store.dispatch(addNewComponentAction(obj));
    this.store.dispatch(addComponent(element))
  }

}
