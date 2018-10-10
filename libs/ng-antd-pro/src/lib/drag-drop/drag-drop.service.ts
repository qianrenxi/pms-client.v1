import { Injectable, NgZone, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

type PointerEventHandler = (event: TouchEvent | MouseEvent) => void;

@Injectable({
    providedIn: 'root'
})
export class DragDropService<I> {

    private _document: Document;

    private _draggableInstance = new Set<I>();
    private _activeDraggableInstance = new Set<I>();

    private _globalListeners = new Map<'touchmove' | 'mousemove' | 'touchend' | 'mouseup', {
        handler: PointerEventHandler,
        options?: any
    }>();

    readonly pointerMove: Subject<TouchEvent | MouseEvent> = new Subject<TouchEvent | MouseEvent>();
    readonly pointerUp: Subject<TouchEvent | MouseEvent> = new Subject<TouchEvent | MouseEvent>();

    constructor(
        private _ngZone: NgZone,
        @Inject(DOCUMENT) _document: any
    ) {
        this._document = _document;
    }

    registerDraggable(draggable: I) {
        this._draggableInstance.add(draggable);

        // 当为0个时全局事件会被移出，所以当存在一个时需要初始化一下
        if (this._draggableInstance.size === 1) {
            // TODO: 添加全局 `touchmove` 监听事件
            // this._ngZone.runOutsideAngular(() => {
                
            // });
        }
    }

    removeDraggable(draggable: I) {
        this._draggableInstance.delete(draggable);
        this.stopDragging(draggable);

        if (this._draggableInstance.size === 0) {
            // TODO: 移出这里的全局 `touchmove` 监听事件
        }
    }

    startDragging(draggable: I, event: MouseEvent | TouchEvent) {
        this._activeDraggableInstance.add(draggable);

        // 仅需要添加一次全局事件
        if (this._activeDraggableInstance.size === 1) {
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
        this._activeDraggableInstance.delete(draggable);

        if (this._activeDraggableInstance.size === 0) {
            this._clearGlobalListeners();
            
            // TODO: enable native interactions
        }
    }

    isDragging(draggable: I): boolean {
        return this._activeDraggableInstance.has(draggable);
    }

    private _clearGlobalListeners() {
        this._globalListeners.forEach((config, name) => {
            this._document.removeEventListener(name, config.handler, config.options);
        });

        this._globalListeners.clear();
    }
}