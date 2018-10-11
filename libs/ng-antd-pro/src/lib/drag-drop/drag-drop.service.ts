import { Injectable, NgZone, Inject, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DroppableService } from './droppable.service';
import { DragStartEvent, DragMoveEvent, DragEndEvent } from './drag-events';

type PointerEventHandler = (event: TouchEvent | MouseEvent) => void;

@Injectable({
    providedIn: 'root'
})
export class DragDropService<I extends {
    dragStart: EventEmitter<DragStartEvent>,
    dragMove: EventEmitter<DragStartEvent>,
    dragEnd: EventEmitter<DragStartEvent>,
}> {

    private _document: Document;

    private _draggableInstances = new Set<I>();
    private _activeDraggableInstances = new Set<I>();

    private _globalListeners = new Map<'touchmove' | 'mousemove' | 'touchend' | 'mouseup', {
        handler: PointerEventHandler,
        options?: any
    }>();

    readonly pointerMove: Subject<TouchEvent | MouseEvent> = new Subject<TouchEvent | MouseEvent>();
    readonly pointerUp: Subject<TouchEvent | MouseEvent> = new Subject<TouchEvent | MouseEvent>();

    constructor(
        private _ngZone: NgZone,
        @Inject(DOCUMENT) _document: any,
        private droppableService: DroppableService
    ) {
        this._document = _document;
    }

    registerDraggable(draggable: I) {
        this._draggableInstances.add(draggable);

        this._connectedToDroppables(draggable);

        // 当为0个时全局事件会被移出，所以当存在一个时需要初始化一下
        if (this._draggableInstances.size === 1) {
            // TODO: 添加全局 `touchmove` 监听事件
            // this._ngZone.runOutsideAngular(() => {
                
            // });
        }
    }

    removeDraggable(draggable: I) {
        this._draggableInstances.delete(draggable);
        this.stopDragging(draggable);

        if (this._draggableInstances.size === 0) {
            // TODO: 移出这里的全局 `touchmove` 监听事件
        }
    }

    startDragging(draggable: I, event: MouseEvent | TouchEvent) {
        this._activeDraggableInstances.add(draggable);

        // 仅需要添加一次全局事件
        if (this._activeDraggableInstances.size === 1) {
            const isTouchEvent = event.type.startsWith('touch');
            const moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
            const upEvent = isTouchEvent ? 'touchend' : 'mouseup';

            // TODO: disable native interactions

            this._globalListeners
                .set(moveEvent, { handler: e => this.pointerMove.next(e) })
                .set(upEvent, { handler: e => this.pointerUp.next(e) })
                .forEach((config, name) => {
                    this._ngZone.runOutsideAngular(() => {
                        this._document.addEventListener(name, config.handler, config.options);
                    })
                });
        }
    }

    stopDragging(draggable: I) {
        this._activeDraggableInstances.delete(draggable);

        if (this._activeDraggableInstances.size === 0) {
            this._clearGlobalListeners();
            
            // TODO: enable native interactions
        }
    }

    isDragging(draggable: I): boolean {
        return this._activeDraggableInstances.has(draggable);
    }

    private _clearGlobalListeners() {
        this._globalListeners.forEach((config, name) => {
            this._document.removeEventListener(name, config.handler, config.options);
        });

        this._globalListeners.clear();
    }

    private _connectedToDroppables(draggable: I) {
        draggable.dragStart.subscribe(e => this._onDragStart(e));
        draggable.dragMove.subscribe(e => this._onDragMove(e));
        draggable.dragEnd.subscribe(e => this._onDragEnd(e));
    }

    private _onDragStart(event: DragStartEvent) {
        this.droppableService.onDragStart(event);
    }
  
    private _onDragMove(event: DragMoveEvent) {
        this.droppableService.onDragMove(event);
    }
  
    private _onDragEnd(event: DragEndEvent) {
        this.droppableService.onDragEnd(event);
    }
}