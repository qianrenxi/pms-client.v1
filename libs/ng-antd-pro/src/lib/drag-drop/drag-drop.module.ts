import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropService } from './drag-drop.service';
import { DraggableDirective } from './draggable.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { SortableDirective } from './sortable.directive';
import { SortableListDirective } from './sortable-list.directive';
import { SortableService } from './sortable.service';
import { DroppableDirective } from './droppable.directive';
import { DroppableService } from './droppable.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DraggableDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective,
    DroppableDirective,
  ],
  exports: [
    DraggableDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective,
    DroppableDirective,
  ],
  entryComponents: [
  ],
  providers: [
    DragDropService,
    SortableService,
    DroppableService,
  ]
})
export class DragDropModule { }
