import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { getNewComponentsArray } from '../store/component-styles.reduser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accordion-section',
  templateUrl: './accordion-section.component.html',
  styleUrls: ['./accordion-section.component.css']
})
export class AccordionSectionComponent implements OnInit {

  styleElements$: Observable<any>
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.styleElements$ = this.store.select(getNewComponentsArray)
    // this.store.select(getNewComponentsArray).subscribe(data => {
    //   this.styleElements = data
    // })
  }
}
