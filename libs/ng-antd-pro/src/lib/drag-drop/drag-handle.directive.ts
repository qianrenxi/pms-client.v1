import { Directive, HostBinding, ElementRef, Inject, Optional } from '@angular/core';
import { AP_DRAG_PARENT } from './drag-parent';
import { toggleNativeDragInteractions } from './drag-styling';

@Directive({
  selector: '[apDragHandle]'
})
export class DragHandleDirective {

  @HostBinding('class.ap-drag-handle') dragHandle = true;

  _parentDrag: {} | undefined;

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(AP_DRAG_PARENT) @Optional() parentDrag?: any
  ) {
    this._parentDrag = parentDrag;
    toggleNativeDragInteractions(element.nativeElement, false);
  }

}
