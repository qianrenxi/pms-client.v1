import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from "@angular/cdk/overlay";
import { ResizableDirective } from './resizable.directive';
import { DraggableDirective } from './draggable.directive';
import { ResizableComponent } from './resizable.component';
import { MovableDirective } from './movable.directive';
import { MovableBoxDirective } from './movable-box.directive';
import { MovableAreaDirective } from './movable-area.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { SortableListDirective } from './sortable-list.directive';
import { SortableDirective } from './sortable.directive';
import { DroppableDirective } from './droppable.directive';
import { DropzoneDirective } from './dropzone.directive';
import { DroppableService } from './droppable.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    ResizableDirective,
    DraggableDirective,
    ResizableComponent,
    MovableDirective,
    MovableBoxDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
    DroppableDirective,
    DropzoneDirective,
  ],
  exports: [
    ResizableDirective,
    DraggableDirective,
    MovableDirective,
    MovableBoxDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
    DroppableDirective,
    DropzoneDirective,
  ],
  entryComponents: [
    ResizableComponent,
  ],
  providers: [
    DroppableService,
  ]
})
export class DragDropModule { }
