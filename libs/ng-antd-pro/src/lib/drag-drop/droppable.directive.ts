import { Directive, HostBinding, Output, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { DragEnterEvent, DragOverEvent, DragLeaveEvent, DropEvent, DragStartEvent, DragEndEvent, DragMoveEvent, DragEventType } from './drag-events';
import { DroppableService } from './droppable.service';

@Directive({
  selector: '[apDroppable]',
  exportAs: 'apDroppable'
})
export class DroppableDirective {

  private _hostElement: HTMLElement;

  @HostBinding('class.ap-droppable-active')
  private _isActive = false;
  @HostBinding('class.ap-droppable-over')
  private _entered = false;

  @HostBinding('class.ap-droppable') droppableStyleClass = true;

  @Output() dragEnter = new EventEmitter<DragEnterEvent>();
  @Output() dragOver = new EventEmitter<DragOverEvent>();
  @Output() dragLeave = new EventEmitter<DragLeaveEvent>();
  @Output() drop = new EventEmitter<DropEvent>();

  constructor(
    public element: ElementRef<HTMLElement>,
    protected ngZone: NgZone,
    protected droppableService: DroppableService
  ) {
    droppableService.dragStart$.subscribe(e => this._allDragStart(e));
    droppableService.dragMove$.subscribe(e => this._allDragMove(e));
    droppableService.dragEnd$.subscribe(e => this._allDragEnd(e));
  }

  private _allDragStart(event: DragStartEvent) {
    // console.log('Some drag start...')
    // if (event.source connectedTo this) { ... }
    this._isActive = true;
    
    if (!this._isActive) {
      return;
    }

    this._hostElement = this._getHostElement();
  }

  private _allDragMove(event: DragMoveEvent) {
    // console.log('Some drag move...')
    if (!this._isActive) {
      return;
    }

    if (event.source === this) {
      // console.log(`it's me`);
      // return;
    }

    // const { source } = event;

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

  private _allDragEnd(event: DragEndEvent) {
    console.log('Some drag end...')
    if (!this._isActive) {
      return;
    }

    // this.ngZone.run(() => {
    //   this.dragOverStyleClass = false;
    //   this.dragOverGapTopStyleClass = false;
    //   this.dragOverGapBottomStyleClass = false;
    // });

    // emit drop event
    if (this._entered) {
      // this.drop.emit({source: event.source, target: this });
      this._drop(event);
    }

    // emit sort event >> on sortable-list
  }

  // enter
  // 指另外一个 sortable 进来了
  private _enter(event: DragMoveEvent) {
    // console.log('enter');
    this._entered = true;
    
    this.dragEnter.emit({
      type: DragEventType.dragEnter,
      source: event.source,
      target: this,
      pointerPosition: event.pointerPosition,
      event: event.event
    });
  }

  // over
  private _over(event: DragMoveEvent) {
    // console.log('over');
    this._entered = true;

    this.dragOver.emit({
      type: DragEventType.dragEnter,
      source: event.source,
      target: this,
      pointerPosition: event.pointerPosition,
      event: event.event
    });
    
    // const dropPosition = this.dropPosition = this._calcDropPosition(event);
    
    // console.log( {
    //   '0' : 'drag-over',
    //   '1' : 'drag-over-gap-bottom',
    //   '-1': 'drag-over-gap-top'
    // }[dropPosition]);

    // this.ngZone.run(() => {
    //   this.dragOverStyleClass = dropPosition === 0;
    //   this.dragOverGapTopStyleClass = dropPosition === -1;
    //   this.dragOverGapBottomStyleClass = dropPosition === 1;
    // });

  }

  // leave
  private _leave(event: DragMoveEvent) {
    // console.log('leave');
    this._entered = false;

    this.dragLeave.emit({
      type: DragEventType.dragEnter,
      source: event.source,
      target: this,
      pointerPosition: event.pointerPosition,
      event: event.event
    });

    // this.ngZone.run(() => {
    //   this.dragOverStyleClass = false;
    //   this.dragOverGapTopStyleClass = false;
    //   this.dragOverGapBottomStyleClass = false;
    // });
  }

  private _drop(event: DragEndEvent) {
    this.drop.emit({
      type: DragEventType.dragEnter,
      source: event.source,
      target: this,
      pointerPosition: null,
      event: null
    });
  }


  private _getHostElement(): HTMLElement {
    return this.element.nativeElement;
  }
}
