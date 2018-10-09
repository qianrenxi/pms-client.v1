import { Directive, ElementRef, HostBinding, OnInit, Renderer2, HostListener, NgZone } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MovableDirective } from './movable.directive';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[apMovableBox]'
})
export class MovableBoxDirective extends MovableDirective implements OnInit {

  @HostBinding('style.transform') get transform(): SafeStyle {
    // return this.sanitizer.bypassSecurityTrustStyle(
    //   `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    // );
    return  null;
  }

  // @HostBinding('style.top') get top(): SafeStyle {
  //   return this.sanitizer.bypassSecurityTrustStyle(`${this.position.y}px`);
  // }

  // @HostBinding('style.left') get left(): SafeStyle {
  //   return this.sanitizer.bypassSecurityTrustStyle(`${this.position.x}px`);
  // }
  

  nativeElement: HTMLElement;

  moveStartPort: Position;

  constructor(
    protected sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    protected ngZone: NgZone
  ) {
    super(sanitizer, elementRef, ngZone);
  }

  ngOnInit() {
    this.nativeElement = this.elementRef.nativeElement;

    this.createOverlay();
  }

  createOverlay() {
    const moveHandler = this.renderer.createElement('div');
    this.renderer.addClass(moveHandler, 'move-handler');
    this.renderer.appendChild(this.nativeElement, moveHandler);
  }

  refreshRect() {
    this.startPosition = {
      x: this.nativeElement.offsetLeft,
      y: this.nativeElement.offsetTop,
    };
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.refreshRect();
    this.moveStartPort = {
      x: event.clientX,
      y: event.clientY
    }
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    const offset: Position = {
      x: event.clientX - this.moveStartPort.x,
      y: event.clientY - this.moveStartPort.y
    };

    // this.position.x = this.startPosition.x + offset.x;
    // this.position.y = this.startPosition.y + offset.y;
    const t = this.startPosition.y + offset.y;
    const l = this.startPosition.x + offset.x;

    this.renderer.setStyle(this.nativeElement, 'top', `${t}px`);
    this.renderer.setStyle(this.nativeElement, 'left', `${l}px`);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (this.reset) {
      this.position = this.startPosition; // {x: 0, y: 0};
    }

    this.refreshRect();
  }
}
