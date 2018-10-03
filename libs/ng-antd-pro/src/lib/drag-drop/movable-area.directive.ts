import { Directive, ContentChildren, QueryList, AfterContentInit, ElementRef } from '@angular/core';
import { MovableDirective } from './movable.directive';
import { Subscription } from 'rxjs';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[apMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit {

  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>;

  private boundaries: Boundaries;
  private subsciptions: Subscription[] = [];

  constructor(private element: ElementRef) { }

  ngAfterContentInit() {
    this.movables.changes.subscribe(() => {
      this.subsciptions.forEach(s => s.unsubscribe());
      
      this.movables.forEach(movable => {
        this.subsciptions.push(
          movable.dragStart.subscribe(() => this.measureBoundaries(movable)),
          movable.dragMove.subscribe(() => this.maintainBoundaries(movable))
        );
      });
    });

    this.movables.notifyOnChanges();
  }

  measureBoundaries(movable: MovableDirective) {
    // bounding rect of this area + 
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();
    
    this.boundaries = {
      minX: viewRect.left -movableClientRect.left + movable.position.x,
      maxX: viewRect.right -movableClientRect.right + movable.position.x,
      minY: viewRect.top -movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom -movableClientRect.bottom + movable.position.y,
    };

    console.log('boundaries are:', this.boundaries);
  }

  maintainBoundaries(movable: MovableDirective): any {
    // movable.position.x = movable.position.x < this.boundaries.minX ? this.boundaries.minX : movable.position.x;

    movable.position.x =  Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x =  Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y =  Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y =  Math.min(this.boundaries.maxY, movable.position.y);
  }


}
