import { Directive, HostBinding, Output, EventEmitter, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef, ContentChild, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[apDraggable], [apDroppable]'
})
export class DraggableDirective {

  @HostBinding('attr.draggable') attrDraggable = true;
  @HostBinding('class.draggable') draggable = true;

  pointerId?: number;

  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.dragging') dragging = false;

  private startPointerEvent: PointerEvent;

  constructor(public element: ElementRef, protected ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      fromEvent(this.element.nativeElement, 'pointerdown').subscribe((event: PointerEvent) => this.onPointerDown(event));
      fromEvent(this.element.nativeElement, 'dragstart').subscribe((event: DragEvent) => this.onPointerDown(event));
      fromEvent(document, 'pointermove').subscribe((event: PointerEvent) => this.onPointerMove(event));
      fromEvent(document, 'pointerup').subscribe((event: PointerEvent) => this.onPointerUp(event));
    });
  }

  // @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent | DragEvent): void {
    // added after YouTube video: ignore right-click
    if (event.button !== 0) {
      return;
    }

    if (event instanceof PointerEvent) {
      this.pointerId = event.pointerId;
      this.startPointerEvent = event;
    }
    event.stopPropagation();

    if (event instanceof DragEvent && !!this.startPointerEvent) {
      event.preventDefault();
      this.ngZone.run(() => {
        this.dragging = true;
        this.dragStart.emit(this.startPointerEvent);
        this.startPointerEvent = undefined;
      });
    }
  }

  // @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    this.ngZone.run(() => {
      this.dragMove.emit(event);
    });
  }

  // added after YouTube video: pointercancel
  // @HostListener('document:pointercancel', ['$event'])
  // @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    this.ngZone.run(() => {
      this.dragging = false;
      this.dragEnd.emit(event);
    });
  }

}
