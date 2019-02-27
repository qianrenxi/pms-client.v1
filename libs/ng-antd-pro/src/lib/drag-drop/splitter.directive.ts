import { Directive, ElementRef, Inject, Input, ChangeDetectorRef } from '@angular/core';
import { DragDrop, DragRef, CDK_DRAG_CONFIG, DragRefConfig, CdkDrag } from '@angular/cdk/drag-drop';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[apSplitter]'
})
export class SplitterDirective<T = any> {

  _dragRef: DragRef;

  /** Locks the position of the dragged element along the specified axis. */
  @Input('apSplitterLockAxis') lockAxis: 'x' | 'y' = 'x';

    /**
   * Selector that will be used to determine the element to which the draggable's position will
   * be constrained. Matching starts from the element's parent and goes up the DOM until a matching
   * element has been found.
   */
  @Input('apSplitterBoundary') boundaryElementSelector: string;

  /** Whether starting to drag this element is disabled. */
  @Input('apSplitterDisabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._dragRef.disabled = this._disabled;
  }
  private _disabled = false;

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(CDK_DRAG_CONFIG) config: DragRefConfig,
    dragDrop: DragDrop,
    protected _changeDetectorRef?: ChangeDetectorRef
  ) {
    this._dragRef = dragDrop.createDrag(element, config);
    this._dragRef.data = this;

    this._syncInputs(this._dragRef);
    this._handleEvents(this._dragRef);
  }


  /** Gets the boundary element, based on the `boundaryElementSelector`. */
  private _getBoundaryElement() {
    const selector = this.boundaryElementSelector;
    return selector ? getClosestMatchingAncestor(this.element.nativeElement, selector) : null;
  }

  /** Syncs the inputs of the CdkDrag with the options of the underlying DragRef. */
  private _syncInputs(ref: DragRef<CdkDrag<T>>) {
    ref.beforeStarted.subscribe(() => {
      if (!ref.isDragging()) {
        const placeholder = null;
        const preview = null;

        ref.disabled = this.disabled;
        ref.lockAxis = this.lockAxis;
        ref
          .withBoundaryElement(this._getBoundaryElement())
          .withPlaceholderTemplate(placeholder)
          .withPreviewTemplate(preview);

      }
    });
  }

  /** Handles the events from the underlying `DragRef`. */
  private _handleEvents(ref: DragRef<CdkDrag<T>>) {
    ref.started.subscribe(() => {
      // this.started.emit({source: this});
      console.log('Splitter drag start.')

      // Since all of these events run outside of change detection,
      // we need to ensure that everything is marked correctly.
      if (this._changeDetectorRef) {
        // @breaking-change 8.0.0 Remove null check for _changeDetectorRef
        this._changeDetectorRef.markForCheck();
      }
    });

    ref.moved.subscribe((args) => {
      const {pointerPosition, delta}: {pointerPosition: {x: number, y: number}, delta: {x: -1 | 0 | 1, y: -1 | 0 | 1}} = args;
      console.log('Splitter drag moved.', pointerPosition, delta)
    });

    // ref.released.subscribe(() => {
    //   this.released.emit({source: this});
    // });

    ref.ended.subscribe(() => {
      // this.ended.emit({source: this});
      console.log('Splitter drag end.')

      // Since all of these events run outside of change detection,
      // we need to ensure that everything is marked correctly.
      if (this._changeDetectorRef) {
        // @breaking-change 8.0.0 Remove null check for _changeDetectorRef
        this._changeDetectorRef.markForCheck();
      }
    });

    // ref.entered.subscribe(event => {
    //   this.entered.emit({
    //     container: event.container.data,
    //     item: this
    //   });
    // });

    // ref.exited.subscribe(event => {
    //   this.exited.emit({
    //     container: event.container.data,
    //     item: this
    //   });
    // });

    // ref.dropped.subscribe(event => {
    //   this.dropped.emit({
    //     previousIndex: event.previousIndex,
    //     currentIndex: event.currentIndex,
    //     previousContainer: event.previousContainer.data,
    //     container: event.container.data,
    //     isPointerOverContainer: event.isPointerOverContainer,
    //     item: this
    //   });
    // });
  }
}

/** Gets the closest ancestor of an element that matches a selector. */
function getClosestMatchingAncestor(element: HTMLElement, selector: string) {
  let currentElement = element.parentElement as HTMLElement | null;

  while (currentElement) {
    // IE doesn't support `matches` so we have to fall back to `msMatchesSelector`.
    if (currentElement.matches ? currentElement.matches(selector) :
        (currentElement as any).msMatchesSelector(selector)) {
      return currentElement;
    }

    currentElement = currentElement.parentElement;
  }

  return null;
}