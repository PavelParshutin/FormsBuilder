import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  getDefaultComponentsStyle,
  getNewComponentsArray,
} from '../../store/component-styles.reduser';
import { ComponentFields } from '../../store/interfaces';

@Component({
  selector: 'app-accordion-section',
  templateUrl: './accordion-section.component.html',
  styleUrls: ['./accordion-section.component.scss']
})
export class AccordionSectionComponent implements OnInit {

  styleElements$: Observable<ComponentFields[]>
  defaultComponentsStyle: Observable<ComponentFields[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.styleElements$ = this.store.select(getNewComponentsArray)
    this.defaultComponentsStyle = this.store.select(getDefaultComponentsStyle)
  }

}
