import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';

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
  handlersConf = ['top', 'top-right', 'right', 'right-bottom', 'bottom', 'bottom-left', 'left', 'left-top'];

  @HostBinding('class.resize-handler') resizable = true;

  startPosition: Position;

  offset: Position;

  @Output() resizeStart = new EventEmitter<any>();
  @Output() resize = new EventEmitter<ResizeRef>();
  @Output() resizeEnd = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDragStart(e: PointerEvent, i) {
    // console.log(e, i);
    // console.log(i, 'drag start');
    this.startPosition = {x: e.clientX, y: e.clientY};
    this.resizeStart.emit();
    e.stopPropagation();
  }

  onDragMove(e: PointerEvent, i) {
    // console.log(e, i);
    this.offset = {
      x: e.clientX - this.startPosition.x,
      y: e.clientY - this.startPosition.y
    };
    // console.log(i, 'drag move', this.offset);
    this.resize.emit({handler: i, offset: this.offset});
    e.stopPropagation();
  }

  onDragEnd(e: PointerEvent, i) {
    // console.log(e, i);
    // console.log(i, 'drag end');
    this.startPosition = null;
    this.resizeEnd.emit();
    e.stopPropagation();
  }

}
