import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropService } from './drag-drop.service';
import { DraggableDirective } from './draggable.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { SortableDirective } from './sortable.directive';
import { SortableListDirective } from './sortable-list.directive';
import { SortableService } from './sortable.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DraggableDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective,
  ],
  exports: [
    DraggableDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective,
  ],
  entryComponents: [
  ],
  providers: [
    DragDropService,
    SortableService
  ]
})
export class DragDropModule { }
