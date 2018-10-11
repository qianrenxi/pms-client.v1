import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, NgZone, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DragDropService } from './drag-drop.service';
import { SortableService } from './sortable.service';
import { DragStartEvent, DragMoveEvent, DragEndEvent } from './drag-events';

@Directive({
  selector: '[apSortable]'
})
export class SortableDirective extends DraggableDirective {
  DRAG_SIDE_RANGE = 0.25;
  DRAG_MIN_GAP = 2;

  private _entered: boolean;
  public dropPosition: -1 | 0 | 1;

  @HostBinding('class.sortable') sortableStyleClass = true;
  @HostBinding('class.drag-over') dragOverStyleClass = false;
  @HostBinding('class.drag-over-gap-top') dragOverGapTopStyleClass = false;
  @HostBinding('class.drag-over-gap-bottom') dragOverGapBottomStyleClass = false;

  @Output() enter = new EventEmitter();
  @Output() over = new EventEmitter();
  @Output() leave = new EventEmitter();
  @Output() drop = new EventEmitter();

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) protected _document: Document,
    protected ngZone: NgZone,
    protected dragDropService: DragDropService<DraggableDirective>,
    private sortableService: SortableService
  ) {
    super(element, _document, ngZone, dragDropService);

    sortableService.dragMove$.subscribe(e => this._onSomeDragMove(e));
    sortableService.dragEnd$.subscribe(e => this._onSomeDragEnd(e));
  }

  @HostListener('dragStart', ['$event'])
  private _onDragStart(event: DragStartEvent) {
    // console.log('sortable item drag start');
    this.sortableService.onDragStart(event);
  }

  @HostListener('dragMove', ['$event'])
  private _onDragMove(event: DragMoveEvent) {
    // console.log('sortable item drag move');
    this.sortableService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event'])
  private _onDragEnd(event: DragEndEvent) {
    this.sortableService.onDragEnd(event);
  }

  private _onSomeDragMove(event: DragMoveEvent) {
    if (event.source === this) {
      // console.log(`it's me`);
      // return;
    }

    // 判断Source和自己是否有交叉，有的话则触发 enter， 如果已经是enter，还有交叉，则over， 如果已经是enter，没有交叉，则leave
    const element = this._hostElement;
    const elementRect = element.getBoundingClientRect();
    const pointerPosition = event.pointerPosition;
    const isInRect = pointerPosition.x >= elementRect.left && pointerPosition.x <= elementRect.right && pointerPosition.y >= elementRect.top && pointerPosition.y <= elementRect.bottom;

    if (this._entered) {
      if (isInRect) {
        this._over(event);
      } else {
        this._leave(event);
      }
    } else {
      if(isInRect) {
        this._enter(event);
      }
    }

  }

  _onSomeDragEnd(event: DragEndEvent) {
    this.ngZone.run(() => {
      this.dragOverStyleClass = false;
      this.dragOverGapTopStyleClass = false;
      this.dragOverGapBottomStyleClass = false;
    });

    // emit drop event
    if (this._entered) {
      this.drop.emit({source: event.source, target: this });
    }

    // emit sort event >> on sortable-list
  }

  // enter
  // 指另外一个 sortable 进来了
  private _enter(event: DragMoveEvent) {
    // console.log('enter');
    this._entered = true;
  }

  // over
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
  private _leave(event: DragMoveEvent) {
    console.log('leave');
    this._entered = false;

    this.ngZone.run(() => {
      this.dragOverStyleClass = false;
      this.dragOverGapTopStyleClass = false;
      this.dragOverGapBottomStyleClass = false;
    });
  }

  _calcDropPosition(event: DragMoveEvent) {
    const pointerY = event.pointerPosition.y;
    const {top, right, bottom, left, width, height} = this._hostElement.getBoundingClientRect();
    const des = Math.max(height * this.DRAG_SIDE_RANGE, this.DRAG_MIN_GAP);

    if (pointerY <= top + des) {
      return -1;
    } else if (pointerY >= bottom - des) {
      return 1;
    }

    return 0;
  }
}
