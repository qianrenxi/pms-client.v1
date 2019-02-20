import { Directive, HostBinding, ElementRef, OnInit, Renderer2, TemplateRef, ViewContainerRef, Injector, ComponentFactoryResolver, ApplicationRef, ComponentRef, Output, EventEmitter, Optional, Host, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { ResizableComponent, ResizeRef } from './resizable.component';
import { DraggableDirective } from './draggable.directive';
import * as _ from 'lodash';
import { isBoolean, isString } from 'util';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

type Handler = 'top' | 'top-right' | 'right' | 'right-bottom' | 'bottom' | 'bottom-left' | 'left' | 'left-top';

@Directive({
  selector: '[apResizable]'
})
export class ResizableDirective implements OnInit, OnChanges {

  _resizable: boolean;
  @Input("apResizable") set resizable(value: any) {
    if (isBoolean(value)) {
      this._resizable = value;
    } else if (isString(value)) {
      this._resizable = value as string !== "false";
    } else {
      this._resizable = true;
    }
  }
  get resizable(): any {
    return this._resizable;
  }
  @Input() resizeHandles: Handler[] | Handler;

  nativeElement: HTMLElement;
  rectEl?: Rect;
  resizeHandlerCompRef: ComponentRef<ResizableComponent>;
  resizeHandler: ResizableComponent;


  @Output() resizeStart = new EventEmitter<Rect>();
  @Output() resize = new EventEmitter<Rect>();
  @Output() resizeEnd = new EventEmitter<Rect>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    @Optional() @Host() private draggable: DraggableDirective
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
    if (this.resizable) {
      this._createHandlerComp();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const resizableChange = changes['resizable'];
    // console.log("resizableChange", draggableChange.previousValue, draggableChange.currentValue);
    if (!resizableChange.isFirstChange()) {
      // console.log("resizableChange", draggableChange.previousValue, draggableChange.currentValue);
      if (this.resizable) {
        this._enableResize();
      } else {
        this._disableResize();
      }
    }
  }

  refreshRect() {
    this.rectEl = {
      x: this.nativeElement.offsetLeft,
      y: this.nativeElement.offsetTop,
      width: this.nativeElement.offsetWidth,
      height: this.nativeElement.offsetHeight
    };
  }

  private _enableResize() {
    // this._disableResize();
    this._createHandlerComp();
  }

  private _disableResize() {
    this.resizeHandlerCompRef.destroy();
    this.resizeHandler = null;

    // TODO: 清理 subscription
  }

  private _createHandlerComp() {
    const a = new ComponentPortal(ResizableComponent, this.viewContainerRef, this.injector);
    const o = new DomPortalOutlet(this.elementRef.nativeElement, this.componentFactoryResolver, this.appRef, this.injector);

    // a.attach(o);
    const comRef: ComponentRef<ResizableComponent> = o.attachComponentPortal(a);
    this.resizeHandler = comRef.instance;
    this.resizeHandlerCompRef = comRef;
    
    if (this.resizeHandles) {
      if (Array.isArray(this.resizeHandles)) {
        this.resizeHandler.handlersConf = _.uniq(this.resizeHandles); 
      } else {
        this.resizeHandler.handlersConf = [this.resizeHandles];
      }
    }

    this.resizeHandler.resizeStart.subscribe(() => {
      if (this.draggable) {
        this.draggable.stopDragging();
      }

      this.refreshRect();
      this.resizeStart.emit(this.rectEl);
    });

    this.resizeHandler.resize.subscribe((it: ResizeRef) => {
      // console.log(it);
      if (this.draggable) {
        this.draggable.stopDragging();
      }

      let rect = this.rectEl;
      if (it.handler === 'top' || it.handler.includes('top')) {
        const t = this.rectEl.y + it.offset.y;
        const h = this.rectEl.height - it.offset.y;
        this.renderer.setStyle(this.nativeElement, 'top', `${t}px`);
        this.renderer.setStyle(this.nativeElement, 'height', `${h}px`);
        
        rect = {...rect, ...{y: t, height: h}};
      }

      if (it.handler === 'right' || it.handler.includes('right')) {
        const w = this.rectEl.width + it.offset.x;
        this.renderer.setStyle(this.nativeElement, 'width', `${w}px`);

        rect = {...rect, ...{width: w}};
      }

      if (it.handler === 'bottom' || it.handler.includes('bottom')) {
        const h = this.rectEl.height + it.offset.y;
        this.renderer.setStyle(this.nativeElement, 'height', `${h}px`);

        rect = {...rect, ...{height: h}};
      }

      if (it.handler === 'left' || it.handler.includes('left')) {
        const l = this.rectEl.x + it.offset.x;
        const w = this.rectEl.width - it.offset.x;
        this.renderer.setStyle(this.nativeElement, 'left', `${l}px`);
        this.renderer.setStyle(this.nativeElement, 'width', `${w}px`);

        rect = {...rect, ...{x: l, width: w}};
      }

      this.resize.emit(rect);
    });

    this.resizeHandler.resizeEnd.subscribe(() => {
      this.refreshRect();
      // console.log(this.rectEl)
      this.resizeEnd.emit(this.rectEl);
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
