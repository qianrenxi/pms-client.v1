import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { OverlayRef, Overlay, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { DraggableDirective } from './draggable.directive';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[apDraggableHelper2]',
  exportAs: 'apDraggableHelper2'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {

  private hideDragImgOverlayRef: OverlayRef;
  private hidePositionStrategy = new GlobalPositionStrategy();

  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition?: {x: number, y: number};

  constructor(
    private draggable: DraggableDirective,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.draggable.dragStart.subscribe((event: DragEvent) => this.onDragStart(event));
    this.draggable.dragMove.subscribe((event: DragEvent) => this.onDragMove(event));
    this.draggable.dragEnd.subscribe((event: DragEvent) => this.onDragEnd(event));

    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy,
      panelClass: 'draggable-helper-overlay'
    });

    
    this.hideDragImgOverlayRef = this.overlay.create({
      positionStrategy: this.hidePositionStrategy,
      panelClass: 'draggable-helper-overlay'
    });
    
  }

  ngOnDestroy(): void {
    this.overlayRef.dispose();
    this.hideDragImgOverlayRef.dispose();
  }

  onDragStart(event: DragEvent): void {
    if (this.overlayRef.hasAttached) {
      this.overlayRef.detach();
    }
    this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));

    // Hide ghost drag image
    this.hideDragImgOverlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    this.hidePositionStrategy.width(`1px`);
    this.hidePositionStrategy.height(`1px`);
    this.hidePositionStrategy.top(`-1000px`);
    this.hidePositionStrategy.left(`-1000px`);
    this.hidePositionStrategy.apply();
    event.dataTransfer.setDragImage(this.hideDragImgOverlayRef.overlayElement, 0, 0);


    const clientRect: ClientRect = this.draggable.element.nativeElement.getBoundingClientRect();
    this.startPosition = {
      // x: event.clientX - clientRect.left,
      // y: event.clientY - clientRect.top
      x: event.clientX,
      y: event.clientY
    };
    // console.log(event, event.clientX, event.clientY)

    // this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    // this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.left(`${event.offsetX + this.startPosition.x}px`);
    this.positionStrategy.top(`${event.offsetY + this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  onDragMove(event: DragEvent): void {
    if (!this.overlayRef.hasAttached) {
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }

    console.log(event, event.clientX, event.clientY)

    // this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    // this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.left(`${event.offsetX + this.startPosition.x}px`);
    this.positionStrategy.top(`${event.offsetY + this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  onDragEnd(event: DragEvent): void {
    this.overlayRef.detach();
    this.hideDragImgOverlayRef.detach();
  }
}
