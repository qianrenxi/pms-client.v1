import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DraggableDirective,
    DraggableHelperDirective,
  ],
  exports: [
    DraggableDirective,
    DraggableHelperDirective,
  ]
})
export class DragDrop2Module { }
