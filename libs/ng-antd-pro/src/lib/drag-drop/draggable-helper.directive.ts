import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Overlay, OverlayRef, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[apDraggableHelper]',
  exportAs: 'apDraggableHelper'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {

  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition?: {x: number, y: number};

  // @HostBinding('class.draggable-helper') helperClass = true;

  constructor(
    private draggable: DraggableDirective,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.draggable.dragStart.subscribe((event: PointerEvent) => this.onDragStart(event));
    this.draggable.dragMove.subscribe((event: PointerEvent) => this.onDragMove(event));
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());

    // create an overlay...
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy,
      panelClass: 'draggable-helper-overlay'
    });
  }

  ngOnDestroy(): void {
    // remove the overlay...
    // this.positionStrategy.dispose();
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent): void {
    // render the helper
    // this.viewContainerRef.createEmbeddedView(this.templateRef);

    this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));

    // determine relative start position
    const clientRect: ClientRect = this.draggable.element.nativeElement.getBoundingClientRect();
    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top
    };

    // this.onDragMove(event);
    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragMove(event: PointerEvent): void {
    // position the helper
    if (!this.overlayRef.hasAttached) {
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }

    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    // remove the helper
    // this.viewContainerRef.clear();

    this.overlayRef.detach();
  }

}
