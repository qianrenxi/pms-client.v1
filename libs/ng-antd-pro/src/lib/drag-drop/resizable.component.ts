import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { DragStartEvent, DragMoveEvent, DragEndEvent } from './drag-events';

interface Position {
  x: number;
  y: number;
}

export interface ResizeRef {
  handler: string;
  offset: Position;
}

@Component({
  selector: 'ap-resizable',
  template: `
    <div *ngFor="let item of handlersConf" [class]="'resize-handler-'+item" 
      apDraggable 
      (dragStart)="onDragStart($event, item)"
      (dragMove)="onDragMove($event, item)"
      (dragEnd)="onDragEnd($event, item)"></div>
  `,
  styles: []
})
export class ResizableComponent implements OnInit {
  @Input() handlersConf = ['top', 'top-right', 'right', 'right-bottom', 'bottom', 'bottom-left', 'left', 'left-top'];

  @HostBinding('class.resize-handler') resizable = true;

  startPosition: Position;

  offset: Position;

  @Output() resizeStart = new EventEmitter<any>();
  @Output() resize = new EventEmitter<ResizeRef>();
  @Output() resizeEnd = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDragStart(e: DragStartEvent, i) {
    const { startPosition } = e;
    // console.log(e, i);
    // console.log(i, 'drag start');
    // this.startPosition = {x: e.clientX, y: e.clientY};
    this.startPosition = startPosition;
    this.resizeStart.emit();
    // e.stopPropagation();
  }

  onDragMove(e: DragMoveEvent, i) {
    // console.log(e, i);
    // this.offset = {
    //   x: e.clientX - this.startPosition.x,
    //   y: e.clientY - this.startPosition.y
    // };
    const { pointerPosition } = e;
    this.offset = {
      x: pointerPosition.x - this.startPosition.x,
      y: pointerPosition.y - this.startPosition.y
    };
    // console.log(i, 'drag move', this.offset);
    this.resize.emit({handler: i, offset: this.offset});
    // e.stopPropagation();
  }

  onDragEnd(e: DragEndEvent, i) {
    // console.log(e, i);
    // console.log(i, 'drag end');
    this.startPosition = null;
    this.resizeEnd.emit();
    // e.stopPropagation();
  }

}
