import { Injectable, SkipSelf, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DroppableService {
  dragStart$: Observable<PointerEvent>;
  // dragMove$: Observable<PointerEvent>;
  dragEnd$: Observable<PointerEvent>;

  private dragStartSubject = new Subject<PointerEvent>();
  // private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  constructor(@SkipSelf() @Optional() private parent: DroppableService) {
    console.log('A droppable service is being created. It is being created with parent: ', !!this.parent);
    this.dragStart$ = this.dragStartSubject.asObservable();
    // this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  onDragStart(event: PointerEvent): void {
    // put additional logic here!
    this.dragStartSubject.next(event);

    if (this.parent) {
      this.parent.onDragStart(event);
    }
  }

  // onDragMove(event: PointerEvent): void {
  //   this.dragMoveSubject.next(event);  
  // }

  onDragEnd(event: PointerEvent): void {
    this.dragEndSubject.next(event);

    if (this.parent) {
      this.parent.onDragEnd(event);
    }
  }

}
