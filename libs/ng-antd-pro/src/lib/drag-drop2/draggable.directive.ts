import { Directive, ElementRef, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[apDraggable2]'
})
export class DraggableDirective {

  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragMove = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();
  
  @HostBinding('attr.draggable') draggable = true;
  @HostBinding('class.draggable') draggableStyleClass = true;
  @HostBinding('class.dragging') dragging = false;

  constructor(
    public element: ElementRef
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
    
    this.dragStart.emit(event);
  }

  @HostListener(':drag', ['$event'])
  onDrag(event: DragEvent): void {
    console.log('Dragging');
    // event.stopPropagation();
    // event.preventDefault();
    // this.drag.emit(event);
    this.dragMove.emit(event);
  }

  @HostListener(':dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    console.log('Drag end');
    event.preventDefault();
    event.stopPropagation();
    this.dragEnd.emit(event);
  }

}
