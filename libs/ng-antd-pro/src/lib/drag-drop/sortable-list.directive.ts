import { Directive, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Input } from '@angular/core';
import { SortableDirective } from './sortable.directive';

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  );  
};

@Directive({
  selector: '[apSortableList]'
})
export class SortableListDirective implements AfterContentInit {

  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;

  @Output() sort = new EventEmitter<SortEvent>();

  @Input() s

  private clientRects: ClientRect[];

  constructor() { }

  ngAfterContentInit(): void {
    // console.log(`Got ${this.sortables.length} sortable items.`);

    this.sortables.forEach(sortable => {
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe((event: PointerEvent) => this.detectSorting(sortable, event));
    })
  }

  measureClientRects(): any {
    // console.log('Measure the client rects');
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  detectSorting(sortable: SortableDirective, event: PointerEvent): any {
    // console.log('Detect sorting...');
    // const currentIndex = this.sortables.toArray().indexOf(sortable);

    // const prevRect = currentIndex > 0 ? this.clientRects[currentIndex - 1] : undefined;
    // const nextRect = currentIndex < this.clientRects.length - 1 ? this.clientRects[currentIndex + 1] : undefined;

    // if (prevRect && event.clientY < prevRect.top + prevRect.height / 2) {
    //   // console.log('Move back!');
    //   this.sort.emit({
    //     currentIndex: currentIndex,
    //     newIndex: currentIndex - 1
    //   });
    // } else if (nextRect && event.clientY > nextRect.top + nextRect.height / 2) {
    //   // console.log('Move forward!');
    //   this.sort.emit({
    //     currentIndex: currentIndex,
    //     newIndex: currentIndex + 1
    //   });
    // }

    // console.log('Current index', currentIndex);

    // get all the client rects
    // sort them by distance to current sortable
    // find first rect that we need to swap with
    // stop

    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];

    const sorted = this.clientRects
      .slice()
      .sort((rectA, rectB) => {
        // sort by distance to current rect
        return distance(rectA, currentRect) - distance(rectB, currentRect);
      })
      .some((rect) => {
        // find first rect that we need to swap with
        
        if (rect === currentRect) {
          return false;
        }

        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ? rect.left < currentRect.left : rect.top < currentRect.top;

        let moveBack = false;
        let moveForward = false;

        if (isHorizontal) {
          moveBack = isBefore && event.clientX < rect.left + rect.width / 2;
          moveForward = !isBefore && event.clientX > rect.left + rect.width / 2; 
        } else {
          moveBack = isBefore && event.clientY < rect.top + rect.height / 2;
          moveForward = !isBefore && event.clientY > rect.top + rect.height / 2; 
        }

        if (moveBack || moveForward) {
          // do sorting
          this.sort.emit({
            currentIndex: currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          });
          return true;
        }

        return false;
        // stop
      });

    // console.log(sorted.map(r => [r.left, r.top]));
  }

}
