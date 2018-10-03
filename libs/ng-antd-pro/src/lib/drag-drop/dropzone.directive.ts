import { Directive, OnInit, HostBinding, HostListener, EventEmitter, Output, SkipSelf } from '@angular/core';
import { DroppableService } from './droppable.service';

@Directive({
  selector: '[apDropzone]',
  providers: [DroppableService]
})
export class DropzoneDirective implements OnInit {

  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Output() drop = new EventEmitter<PointerEvent>();
  @Output() remove = new EventEmitter<PointerEvent>();

  constructor(
    @SkipSelf() private allDroppableService: DroppableService,
    private innerDroppableService: DroppableService,
  ) { }

  ngOnInit(): void {
    this.allDroppableService.dragStart$.subscribe((event: PointerEvent) => this.onDragStart(event));
    // this.droppableService.dragMove$.subscribe((event: PointerEvent) => this.onDragMove(event));
    this.allDroppableService.dragEnd$.subscribe((event: PointerEvent) => this.onDragEnd(event));

    this.innerDroppableService.dragStart$.subscribe((event: PointerEvent) => this.onInnerDragStart(event));
    // this.droppableService.dragMove$.subscribe((event: PointerEvent) => this.onDragMove(event));
    this.innerDroppableService.dragEnd$.subscribe((event: PointerEvent) => this.onInnerDragEnd(event));
  }

  @HostListener('pointerenter')
  onPointerEnter(): void {
    if (this.activated) {
      this.entered = true;
    }
  }
  @HostListener('pointerleave')
  onPointerLeave(): void {
    if (!this.activated) {
      return;
    }
    this.entered = false;
  }

  private onDragStart(event: PointerEvent) {
    this.activated = true;
  }

  // private onDragMove(event: PointerEvent) {
  // }

  private onDragEnd(event: PointerEvent) {
    if (!this.activated) {
      return;
    }
    if (this.entered) {
      // we have a drop!
      // console.log('drop!');
      this.drop.emit(event);
    }
    this.activated = false;
    this.entered = false;
  }

  onInnerDragStart(event: PointerEvent): any {
    this.activated = true;
    this.entered = true;
  }

  onInnerDragEnd(event: PointerEvent): any {
    if (!this.entered) {
      this.remove.emit(event);
    }
    this.activated = false;
    this.entered = false;
  }
}
