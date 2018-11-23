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
import { DragHandleDirective } from './drag-handle.directive';
import { ResizableComponent } from './resizable.component';
import { ResizableDirective } from './resizable.directive';

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
    DragHandleDirective,
    ResizableDirective,
    ResizableComponent,
  ],
  exports: [
    DraggableDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective,
    DroppableDirective,
    DragHandleDirective,
    ResizableDirective,
  ],
  entryComponents: [
    ResizableComponent
  ],
  providers: [
    DragDropService,
    SortableService,
    DroppableService,
  ]
})
export class DragDropModule { }
