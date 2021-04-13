import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  getBtnStyleSelector, getCheckStyleSelector,
  getGeneralStyle, getInputTextStyleSelector, getLabelStyleSelector,
  getNewComponentsArray, getSelectStyleSelector,
  getTextAreaStyleSelector
} from '../../store/component-styles.reduser';

@Component({
  selector: 'app-accordion-section',
  templateUrl: './accordion-section.component.html',
  styleUrls: ['./accordion-section.component.scss']
})
export class AccordionSectionComponent implements OnInit {

  generalStyle$: Observable<any>
  styleElements$: Observable<any>
  btnDefaultStyle$: Observable<any>
  inputTextDefaultStyle$: Observable<any>
  labelDefaultStyle$: Observable<any>
  checkboxDefaultStyle$: Observable<any>
  selectDefaultStyle$: Observable<any>
  textAreaDefaultStyle$: Observable<any>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.generalStyle$ = this.store.select(getGeneralStyle)
    this.styleElements$ = this.store.select(getNewComponentsArray)
    this.btnDefaultStyle$ = this.store.select(getBtnStyleSelector)
    this.inputTextDefaultStyle$ = this.store.select(getInputTextStyleSelector)
    this.labelDefaultStyle$ = this.store.select(getLabelStyleSelector)
    this.checkboxDefaultStyle$ = this.store.select(getCheckStyleSelector)
    this.selectDefaultStyle$ = this.store.select(getSelectStyleSelector)
    this.textAreaDefaultStyle$ = this.store.select(getTextAreaStyleSelector)
  }

}
