import { Directive, ElementRef, NgZone, OnInit, HostBinding, AfterViewInit, OnDestroy, Output, EventEmitter, Input, ContentChild, Inject, HostListener, Optional, ViewContainerRef, EmbeddedViewRef, ContentChildren, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { DragDropService } from './drag-drop.service';
import { isTouchEvent, setTransform } from './utils';
import { DragStartEvent, DragEventType, DragMoveEvent, DragEndEvent } from './drag-events';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { extendStyles } from './drag-styling';
import { DOCUMENT } from '@angular/common';
import { DragHandleDirective } from './drag-handle.directive';
import { AP_DRAG_PARENT } from './drag-parent';

interface Point {
  x: number;
  y: number;
}

@Directive({
  selector: '[apDraggable]',
  exportAs: 'apDraggable',
  providers: [{
    provide: AP_DRAG_PARENT,
    useExisting: DraggableDirective
  }]
})
export class DraggableDirective implements AfterViewInit, OnDestroy {

  protected _document: Document;
  protected _hostElement: HTMLElement;
  private _helperElement: HTMLElement;
  private _helperRef: EmbeddedViewRef<any>;

  private _hasMoved: boolean;
  private _hasStartedDragging: boolean;

  private subscriptions: Subscription[] = [];
  private _pointerMoveSubscription = Subscription.EMPTY;
  private _pointerUpSubscription = Subscription.EMPTY;

  private _scrollPosition: {top: number; left: number};
  private _pickupPositionOnPage: Point; // 用户选择元素时的坐标，起始坐标

  @HostBinding("class.ap-draggable") draggableStyleClass = true;

  @ContentChildren(DragHandleDirective, {descendants: true}) _handles: QueryList<DragHandleDirective>;

  @ContentChild(DraggableHelperDirective) draggableHelper: DraggableHelperDirective; 

  @Input() dragData: any;

  @Output() dragStart: EventEmitter<DragStartEvent> = new EventEmitter<DragStartEvent>();
  @Output() dragMove: EventEmitter<DragMoveEvent> = new EventEmitter<DragMoveEvent>();
  @Output() dragEnd: EventEmitter<DragEndEvent> = new EventEmitter<DragEndEvent>();

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) _document: any,
    protected viewContainerRef: ViewContainerRef,
    protected ngZone: NgZone,
    protected dragDropService: DragDropService<DraggableDirective>
  ) {
    this._document = _document;
    this.dragDropService.registerDraggable(this);
  }

  ngAfterViewInit() {
    this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      const hostElement = this._hostElement = this._getHostElement();
      this.subscriptions.push(
        fromEvent(hostElement, 'mousedown').subscribe((e: MouseEvent) => this._pointerDown(e)),
        fromEvent(hostElement, 'touchstart').subscribe((e: TouchEvent) => this._pointerDown(e))
      );
    });
  }

  ngOnDestroy() {

    this.subscriptions.forEach(s =>  s.unsubscribe());
    this.dragDropService.removeDraggable(this);
    this._removeSubscriptions();
  }

  private _isDragging() {
    return this.dragDropService.isDragging(this);
  }

  private _pointerDown(event: MouseEvent | TouchEvent) {
    // Skip handles inside descendant `DraggableDirective` instances.
    const handles = this._handles.filter(handle => handle._parentDrag === this);
    
    // Delegate the event based on whether it started from a handle or the element itself.
    if (handles.length) {
      const targetHandle = handles.find(handle => {
        const element = handle.element.nativeElement;
        const target = event.target;
        return !!target && (target === element || element.contains(target as HTMLElement));
      });

      if (targetHandle) {
        this._initDrag(targetHandle.element.nativeElement, event);
      }
    } else {
      this._initDrag(this._hostElement, event);
    }
  }

  private _pointerMove(event: MouseEvent | TouchEvent) {
    const pointerPosition = this._getConstrainedPointerPosition(event);

    if (!this._hasStartedDragging) {
      const distanceX = Math.abs(pointerPosition.x - this._pickupPositionOnPage.x);
      const distanceY = Math.abs(pointerPosition.y - this._pickupPositionOnPage.y);
      const minimumDistance = 1; // DODO: Read from config

      if (distanceX + distanceY >= minimumDistance) {
        this._hasStartedDragging = true;
        this.ngZone.run(() => this._starDrag());
        console.log("drag start")
      }
      return;
    }

    this._hasMoved = true;
    event.preventDefault();
    // update move info
    this._updateRender(pointerPosition);
    // emit dragMove event
    this.dragMove.emit({type: DragEventType.dragMove, source: this, pointerPosition: pointerPosition, event: event});

    // console.log("Dragging", pointerPosition);
    // console.log("dragging");
  }

  private _pointerUp(event: MouseEvent | TouchEvent) {
    if (!this._isDragging()) {
      return;
    }

    this._removeSubscriptions();
    this.dragDropService.stopDragging(this);

    if (!this._hasStartedDragging) {
      return;
    }

    // ...
    // then cleanup
    this._destroyHelper();

    // emit dragEnd event
    this.dragEnd.emit({type: DragEventType.dragEnd, source: this});
    // do drag end or drop things

    console.log("drag end");
  }

  private _initDrag(referenceElement: HTMLElement, event: MouseEvent | TouchEvent) {
    const isDragging = this._isDragging();

    if (isDragging) {
      return;
    }

    this._hasStartedDragging = this._hasMoved = false;
    this._pointerMoveSubscription = this.dragDropService.pointerMove.subscribe(e => this._pointerMove(e));
    this._pointerUpSubscription = this.dragDropService.pointerUp.subscribe(e => this._pointerUp(e));
    this._scrollPosition = {top: 0, left: 0}; // TODO: get real scroll postition value

    this._pickupPositionOnPage = this._getPointerPositionOnPage(event);
    this.dragDropService.startDragging(this, event);
  }

  private _starDrag() {
    this.dragStart.emit({type: DragEventType.dragStart, source: this});

    // if (!this.dropContainer) {
    //  return;
    // }

    const element = this._hostElement;
    const helper = this._helperElement = this._createHelperElement();

    // element.style.display = 'none'; // TODO: replace with placehoder
    this._document.body.appendChild(helper);
    // drop container start()
  }

  // _updateActiveDropContainer
  private _updateRender({x, y}: Point) {
    setTransform(this._helperElement, x, y);
  }

  /** Determines the point of the page that was touched by the user. */
  private _getPointerPositionOnPage(event: MouseEvent | TouchEvent): Point {
    const point = isTouchEvent(event) ? event.touches[0] : event;

    return {
      x: point.pageX - this._scrollPosition.left,
      y: point.pageY - this._scrollPosition.top
    };
  }

  /** Gets the pointer position on the page, accounting for any position constraints. */
  private _getConstrainedPointerPosition(event: MouseEvent | TouchEvent): Point {
    const point = this._getPointerPositionOnPage(event);
    // const dropContainerLock = this.dropContainer ? this.dropContainer.lockAxis : null;

    // if (this.lockAxis === 'x' || dropContainerLock === 'x') {
    //   point.y = this._pickupPositionOnPage.y;
    // } else if (this.lockAxis === 'y' || dropContainerLock === 'y') {
    //   point.x = this._pickupPositionOnPage.x;
    // }

    return point;
  }

  private _getHostElement(): HTMLElement {
    return this.element.nativeElement;
  }

  private _createHelperElement(): HTMLElement {
    let helper: HTMLElement;

    if (this.draggableHelper) {
      const viewRef = this.viewContainerRef.createEmbeddedView(this.draggableHelper.templateRef);
      this._helperRef = viewRef;
      helper = viewRef.rootNodes[0];
      setTransform(helper, this._pickupPositionOnPage.x, this._pickupPositionOnPage.y);
    } else {
      const element = this._hostElement;
      const elementRect = element.getBoundingClientRect();

      helper = element.cloneNode(true) as HTMLElement;
      helper.style.width = `${elementRect.width}px`;
      helper.style.height = `${elementRect.height}px`;
      setTransform(helper, elementRect.left, elementRect.top);
    }

    helper.className = helper.className + ' ap-draggable-helper'

    extendStyles(helper.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1000'
    });

    return helper;
  }

  private _removeElement(element: HTMLElement | null) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  private _destroyHelper() {
    if (this._helperElement) {
      this._removeElement(this._helperElement);
    }
    
    if (this._helperRef) {
      this._helperRef.destroy()
    }

    this._helperElement = this._helperRef = null;
  }

  
  private _removeSubscriptions() {
    this._pointerMoveSubscription.unsubscribe();
    this._pointerUpSubscription.unsubscribe();
  }
}
