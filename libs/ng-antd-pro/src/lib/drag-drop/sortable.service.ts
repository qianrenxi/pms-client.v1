import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DragStartEvent, DragEndEvent, DragMoveEvent } from './drag-events';

@Injectable()
export class SortableService {

    dragStart$: Observable<DragStartEvent>;
    dragMove$: Observable<DragMoveEvent>;
    dragEnd$: Observable<DragEndEvent>;

    private _dragStartSubject = new Subject<DragStartEvent>();
    private _dragMoveSubject = new Subject<DragMoveEvent>();
    private _dragEndSubject = new Subject<DragEndEvent>();

    constructor(
    ) {
        this.dragStart$ = this._dragStartSubject.asObservable();
        this.dragMove$ = this._dragMoveSubject.asObservable();
        this.dragEnd$ = this._dragEndSubject.asObservable();
    }

    onDragStart(event: DragStartEvent) {
        this._dragStartSubject.next(event);
    }

    onDragMove(event: DragMoveEvent) {
        this._dragMoveSubject.next(event);
    }

    onDragEnd(event: DragEndEvent) {
        this._dragEndSubject.next(event);
    }
}