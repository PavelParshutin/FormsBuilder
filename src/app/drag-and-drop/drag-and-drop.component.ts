import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ComponentPortal, DomPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit, AfterViewInit {

  @ViewChild('myPortalContent') domPortalContent1: ElementRef<HTMLElement>;
  @ViewChild('formBuilderDragAndDrop') domPortalContent2: ElementRef<HTMLElement>;
  @ViewChild('availableFieldsDragAndDrop') domPortalContent3: ElementRef<HTMLElement>;
  selectedPortal: Portal<any>;
  availableFieldsPortal: Portal<any>;
  formBuilderListPortal: Portal<any>;

  formBuilderList = [
    'test 1',
    'test 2',
    'test 3',
    'test 4'
  ];
  done = [
    'first element',
    'second element'
  ];
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.selectedPortal = new DomPortal(this.domPortalContent1);
    this.formBuilderListPortal = new DomPortal(this.domPortalContent2);
    this.availableFieldsPortal = new DomPortal(this.domPortalContent3);
  }
  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
