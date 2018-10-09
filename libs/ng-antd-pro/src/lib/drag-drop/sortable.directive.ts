import { Directive, forwardRef, ElementRef, HostBinding, NgZone } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[apSortable]',
  providers: [
    { provide: DraggableDirective, useExisting: forwardRef(() => SortableDirective)}
  ]
})
export class SortableDirective extends DraggableDirective {

  @HostBinding('class.sortable') sortable = true;

  constructor(public element: ElementRef, protected ngZone: NgZone) {
    super(element, ngZone);
  }

}
