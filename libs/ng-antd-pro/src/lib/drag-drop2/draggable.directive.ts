import { Directive, ElementRef, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[apDraggable2]'
})
export class DraggableDirective {

  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() drag = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();
  
  @HostBinding('attr.draggable') draggable = true;
  @HostBinding('class.draggable') draggableStyleClass = true;
  @HostBinding('class.dragging') dragging = false;

  constructor(
    private element: ElementRef
  ) { }

  @HostListener(':dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    console.log("drag start")
    if (event.button !== 0) {
      return;
    }

    this.dragging = true;
    // event.preventDefault()
    event.stopPropagation();

    try {
      // ie throw error
      // firefox-need-it
      event.dataTransfer.setData('text/plain', '');
    } catch (error) {
      // empty
    }

    event.dataTransfer.setDragImage(null, 0, 0);

    this.dragStart.emit(event);
  }

  @HostListener(':drag', ['$event'])
  onDrag(event: DragEvent): void {
    console.log('Dragging');
  }

  @HostListener(':dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    console.log('Drag end')
  }

}
