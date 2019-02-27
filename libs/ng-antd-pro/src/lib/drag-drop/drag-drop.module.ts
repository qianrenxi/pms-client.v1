import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule as CdkDragDropModule } from '@angular/cdk/drag-drop';
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
import { SplitterDirective } from './splitter.directive';

@NgModule({
  imports: [
    CommonModule,
    CdkDragDropModule,
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
    SplitterDirective,
  ],
  exports: [
    DraggableDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective,
    DroppableDirective,
    DragHandleDirective,
    ResizableDirective,
    SplitterDirective,
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
