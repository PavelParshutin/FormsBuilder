import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import {
  getDefaultComponentsStyleSelector,
  getAppGeneralStyleSelector,
  getNewComponentsArraySelector
} from '../store/component-styles.reduser';
import { LabelComponent } from './shared/components/label/label.component';
import { InputTextComponent } from './shared/components/input-text/input-text.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { SelectComponent } from './shared/components/select/select.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import { TextAreaComponent } from './shared/components/text-area/text-area.component';
import { addNewComponentAction } from '../store/component-styles.actions';
import { DefaultComponent, ComponentFields } from '../store/interfaces';
import { ComponentName } from '../store/enums';

@Component({
  selector: 'app-form-builder-page',
  templateUrl: './form-builder-page.component.html',
  styleUrls: ['./form-builder-page.component.scss']
})
export class FormBuilderPageComponent implements OnInit, AfterViewInit {

  dragList: DefaultComponent[] = [];
  dropList: DefaultComponent[] = [];

  defaultComponents = [
    {
      class: LabelComponent,
      componentType: ComponentName.Label
    },
    {
      class: InputTextComponent,
      componentType: ComponentName.Input
    },
    {
      class: ButtonComponent,
      componentType: ComponentName.Button
    },
    {
      class: SelectComponent,
      componentType: ComponentName.Select
    },
    {
      class: CheckboxComponent,
      componentType: ComponentName.Checkbox
    },
    {
      class: TextAreaComponent,
      componentType: ComponentName.TextArea
    }
  ]
  defaultComponentsStyles: ComponentFields[]

  tempGeneralStyle;

  constructor(private store: Store, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscribe()
  }

  ngAfterViewInit(): void {
    this.dragList = [
      this.createComponent(ComponentName.Label),
      this.createComponent(ComponentName.Input),
      this.createComponent(ComponentName.Button),
      this.createComponent(ComponentName.Select),
      this.createComponent(ComponentName.Checkbox),
      this.createComponent(ComponentName.TextArea)
    ];
    this.cdr.detectChanges();
  }

  drop(event: CdkDragDrop<DefaultComponent[]>): void {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // copyArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex)
      const newComp: DefaultComponent = this.createComponent(event.previousContainer.data[event.previousIndex].inputs.componentType)
      this.dropList.push(newComp)
      this.store.dispatch(addNewComponentAction(newComp.inputs));
    }
  }

  subscribe(): void {
    this.store.select(getAppGeneralStyleSelector).subscribe(style => this.tempGeneralStyle = style)

    const defaultComponentsStyle$ = this.store.select(getDefaultComponentsStyleSelector)
    defaultComponentsStyle$.subscribe(comp => {
      this.defaultComponentsStyles = comp
      this.setStyle(comp, this.dragList)
    })

    const dropElemStyles$ = this.store.select(getNewComponentsArraySelector);
    dropElemStyles$.subscribe(comp => {
      this.setStyle(comp, this.dropList)
      for(const elem of this.dropList) {
        const result = comp.find(item => item.id === elem.inputs.id)
        if(!result) {
          this.dropList = this.dropList.filter(item => item.inputs.id !== elem.inputs.id)
        }
      }
    });
  }

  setStyle(arrayComp: ComponentFields[], arrayForChange: Array<DefaultComponent>): void {
    const compareParam = arrayForChange === this.dragList ? 'componentType' : 'id'
    for(const comp of arrayComp) {
      const currentElement = arrayForChange.find(elem => elem.inputs[compareParam] === comp[compareParam])
      if(currentElement) {
        currentElement.inputs.style = comp.style;
        currentElement.inputs.title = comp.title;
        currentElement.inputs.anotherProperties = comp.anotherProperties;
      }
    }
  }

  createComponent(componentType: string): DefaultComponent {
    const componentStyle = this.defaultComponentsStyles.find(item => item.componentType === componentType)
    const defaultClass = this.defaultComponents.find(item => item.componentType === componentType)
    return {
      component: defaultClass.class,
      inputs: {
        style: componentStyle.style,
        title: componentStyle.title,
        componentType: componentStyle.componentType,
        anotherProperties: componentStyle.anotherProperties,
        id: Math.floor((Math.random() * 1000000) + 1)
      }
    }
  }
}
