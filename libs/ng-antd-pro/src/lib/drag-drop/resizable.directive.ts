import { Directive, HostBinding, ElementRef, OnInit, Renderer2, TemplateRef, ViewContainerRef, Injector, ComponentFactoryResolver, ApplicationRef, ComponentRef, Output } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { ResizableComponent, ResizeRef } from './resizable.component';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Directive({
  selector: '[apResizable]'
})
export class ResizableDirective implements OnInit {

  nativeElement: HTMLElement;
  rectEl?: Rect;
  resizeHandler: ResizableComponent;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
  ) { }

  @HostBinding('class.resizable') activated = true;

  ngOnInit() {
    this.nativeElement = this.elementRef.nativeElement;
    this.rectEl = {
      x: this.nativeElement.clientLeft,
      y: this.nativeElement.clientTop,
      width: this.nativeElement.clientWidth,
      height: this.nativeElement.clientHeight
    };

    // this.createHandler();
    this.createHandlerComp();
  }

  refreshRect() {
    this.rectEl = {
      x: this.nativeElement.offsetLeft,
      y: this.nativeElement.offsetTop,
      width: this.nativeElement.offsetWidth,
      height: this.nativeElement.offsetHeight
    };
  }

  createHandlerComp() {
    const a = new ComponentPortal(ResizableComponent, this.viewContainerRef, this.injector);
    const o = new DomPortalOutlet(this.elementRef.nativeElement, this.componentFactoryResolver, this.appRef, this.injector);

    // a.attach(o);
    const comRef: ComponentRef<ResizableComponent> = o.attachComponentPortal(a);
    this.resizeHandler = comRef.instance;

    this.resizeHandler.resizeStart.subscribe(() => {
      this.refreshRect();
    });

    this.resizeHandler.resize.subscribe((it: ResizeRef) => {
      // console.log(it);
      if (it.handler === 'top' || it.handler.includes('top')) {
        const t = this.rectEl.y + it.offset.y;
        const h = this.rectEl.height - it.offset.y;
        this.renderer.setStyle(this.nativeElement, 'top', `${t}px`);
        this.renderer.setStyle(this.nativeElement, 'height', `${h}px`);
      }

      if (it.handler === 'right' || it.handler.includes('right')) {
        const w = this.rectEl.width + it.offset.x;
        this.renderer.setStyle(this.nativeElement, 'width', `${w}px`);
      }

      if (it.handler === 'bottom' || it.handler.includes('bottom')) {
        const h = this.rectEl.height + it.offset.y;
        this.renderer.setStyle(this.nativeElement, 'height', `${h}px`);
      }

      if (it.handler === 'left' || it.handler.includes('left')) {
        const l = this.rectEl.x + it.offset.x;
        const w = this.rectEl.width - it.offset.x;
        this.renderer.setStyle(this.nativeElement, 'left', `${l}px`);
        this.renderer.setStyle(this.nativeElement, 'width', `${w}px`);
      }

    });

    this.resizeHandler.resizeEnd.subscribe(() => {
      this.refreshRect();
      // console.log(this.rectEl)
    });

  }







  // 没用了
  createHandler() {
    const resizeHandler = this.renderer.createElement('div');
    this.renderer.addClass(resizeHandler, 'resize-handler');
    // this.renderer.setStyle(resizeHandler, 'width', `${this.rectEl.width}px`);
    // this.renderer.setStyle(resizeHandler, 'height', `${this.rectEl.height}px`);
    // this.renderer.setStyle(resizeHandler, 'background', `#00ffdd`);

    const handlersConf = ['top', 'top-right', 'right', 'right-bottom', 'bottom', 'bottom-left', 'left', 'left-top'];
    const handlers = handlersConf.map(it => {
      const handler = this.renderer.createElement('div');
      this.renderer.addClass(handler, `resize-handler-${it}`);
      
      this.renderer.appendChild(resizeHandler, handler);
      return handler;
    });

    // let hTop = this.renderer.createElement('div.resize-handler-top');
    this.renderer.appendChild(this.nativeElement, resizeHandler);
  }
}
