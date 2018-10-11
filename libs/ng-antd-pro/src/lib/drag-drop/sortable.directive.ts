import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, NgZone, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DragDropService } from './drag-drop.service';
import { SortableService } from './sortable.service';
import { DragStartEvent, DragMoveEvent, DragEndEvent, DragEnterEvent, DragOverEvent, DragLeaveEvent, DropEvent } from './drag-events';
import { DroppableDirective } from './droppable.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';

@Directive({
  selector: '[apSortable]',
})
export class SortableDirective {

  DRAG_SIDE_RANGE = 0.25;
  DRAG_MIN_GAP = 2;

  private _entered: boolean;
  public dropPosition: -1 | 0 | 1;

  @HostBinding('class.sortable') sortableStyleClass = true;
  @HostBinding('class.drag-over') dragOverStyleClass = false;
  @HostBinding('class.drag-over-gap-top') dragOverGapTopStyleClass = false;
  @HostBinding('class.drag-over-gap-bottom') dragOverGapBottomStyleClass = false;

  // @Output() enter = new EventEmitter();
  // @Output() over = new EventEmitter();
  // @Output() leave = new EventEmitter();
  @Output() sortableDrop = new EventEmitter();

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) protected _document: Document,
    protected ngZone: NgZone,
    protected dragDropService: DragDropService<DraggableDirective>,
  ) {
  }

  // enter
  // 指另外一个 sortable 进来了
  @HostListener('dragEnter', ['$event'])
  private _enter(event: DragMoveEvent) {
    // console.log('enter');
    this._entered = true;
  }

  // over
  @HostListener('dragOver', ['$event'])
  private _over(event: DragMoveEvent) {
    console.log('over');
    this._entered = true;
    
    const dropPosition = this.dropPosition = this._calcDropPosition(event);
    
    // console.log( {
    //   '0' : 'drag-over',
    //   '1' : 'drag-over-gap-bottom',
    //   '-1': 'drag-over-gap-top'
    // }[dropPosition]);

    this.ngZone.run(() => {
      this.dragOverStyleClass = dropPosition === 0;
      this.dragOverGapTopStyleClass = dropPosition === -1;
      this.dragOverGapBottomStyleClass = dropPosition === 1;
    });

  }

  // leave
  @HostListener('dragLeave', ['$event'])
  private _leave(event: DragMoveEvent) {
    console.log('leave');
    this._entered = false;

    this.ngZone.run(() => {
      this.dragOverStyleClass = false;
      this.dragOverGapTopStyleClass = false;
      this.dragOverGapBottomStyleClass = false;
    });
  }

  @HostListener('drop', ['$event'])
  _onDrop(event: DragEndEvent) {
    console.log('drop');
    this.ngZone.run(() => {
      this.dragOverStyleClass = false;
      this.dragOverGapTopStyleClass = false;
      this.dragOverGapBottomStyleClass = false;
    });

    // emit drop event
    if (this._entered) {
      this.sortableDrop.emit({source: event.source, target: this });
    }

    // emit sort event >> on sortable-list
  }

  _calcDropPosition(event: DragMoveEvent) {
    const pointerY = event.pointerPosition.y;
    const {top, right, bottom, left, width, height} = this.element.nativeElement.getBoundingClientRect();
    const des = Math.max(height * this.DRAG_SIDE_RANGE, this.DRAG_MIN_GAP);

    if (pointerY <= top + des) {
      return -1;
    } else if (pointerY >= bottom - des) {
      return 1;
    }

    return 0;
  }
}
