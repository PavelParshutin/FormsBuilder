import { Component, OnInit } from '@angular/core';
import {getNewComponentsArray} from '../store/defaultStyles.reduser';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-acordion-section',
  templateUrl: './acordion-section.component.html',
  styleUrls: ['./acordion-section.component.css']
})
export class AcordionSectionComponent implements OnInit {

  elemDataForAccordion = []
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getNewComponentsArray).subscribe(data => this.elemDataForAccordion = data)
  }
}
