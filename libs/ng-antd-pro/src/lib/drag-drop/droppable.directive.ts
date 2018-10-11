import { Directive, HostBinding, Output, EventEmitter } from '@angular/core';
import { DragEnterEvent, DragOverEvent, DragLeaveEvent, DropEvent } from './drag-events';
import { DroppableService } from './droppable.service';

@Directive({
  selector: '[apDroppable]'
})
export class DroppableDirective {

  private _entered = false;

  @HostBinding('class.ap-droppable') droppableStyleClass = true;

  @Output() enter = new EventEmitter<DragEnterEvent>();
  @Output() over = new EventEmitter<DragOverEvent>();
  @Output() leave = new EventEmitter<DragLeaveEvent>();
  @Output() drop = new EventEmitter<DropEvent>();

  constructor(
    protected droppableService: DroppableService<DroppableDirective>
  ) { }

}
