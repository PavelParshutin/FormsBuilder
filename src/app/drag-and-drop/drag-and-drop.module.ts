import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragAndDropComponent} from './drag-and-drop.component';
import {PortalModule} from '@angular/cdk/portal';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [DragAndDropComponent],
  imports: [
    CommonModule,
    PortalModule,
    MatInputModule,
    DragDropModule
  ],
  exports: [DragAndDropComponent]
})
export class DragAndDropModule { }
