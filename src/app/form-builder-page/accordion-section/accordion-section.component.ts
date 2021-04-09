import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {getGeneralStyle, getNewComponentsArray} from '../../store/component-styles.reduser';

@Component({
  selector: 'app-accordion-section',
  templateUrl: './accordion-section.component.html',
  styleUrls: ['./accordion-section.component.css']
})
export class AccordionSectionComponent implements OnInit {

  generalStyle$: Observable<any>
  styleElements$: Observable<any>
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.generalStyle$ = this.store.select(getGeneralStyle)
    this.styleElements$ = this.store.select(getNewComponentsArray)
  }

}
