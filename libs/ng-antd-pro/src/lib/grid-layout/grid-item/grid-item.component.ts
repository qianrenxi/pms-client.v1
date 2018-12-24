import { Component, OnInit, Optional, Host, ElementRef, HostBinding, Input, HostListener, OnDestroy } from '@angular/core';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { Position, setTransform, setTopLeft, perc } from '../utils';
import { GridLayoutService } from '../grid-layout.service';

interface GridItemRect {
  // number of grid units
  x: number;
  y: number;
  w: number;
  h: number;
}

interface GridItemRectRange {
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
}

@Component({
  selector: 'ap-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit, OnDestroy {

  @Input() rect: GridItemRect;

  get colWidth() {
    return 50;
  }

  get rowHeight() {
    return 50;
  }

  @HostBinding("class.ap-grid-item")
  apGridItemStyleClass = true;

  @HostListener("window:resize", ['$event'])
  onContainerResize($event) {
    // TODO: 使用 Observable 的 debounce 防抖动
    this.patchStyle();
  }

  constructor(
    protected elementRef: ElementRef,
    @Optional() @Host() protected gridLayoutComponent: GridLayoutComponent,
    @Optional() @Host() protected gridLayoutService: GridLayoutService,
  ) {
    if (!gridLayoutComponent) {
      throw new Error('GridItem must contains in GridLayout container.');
    }
    if (gridLayoutService) {
      gridLayoutService.registItem(this);
    }
  }

  ngOnInit() {
    this.patchStyle();

    // if (!!this.resizable) {
    //   this.resizable.resize.subscribe((e) => this._onResize(e));
    // }
  }

  ngOnDestroy() {
    this.gridLayoutService.unregistItem(this);
  }

  getSiblings(): GridItemComponent[] {
    return this.gridLayoutService.getSiblings(this);
  }

  patchStyle() {
    const pos = this._calcPosition(this.rect);
    const style = this._createStyle(pos);
    const element = this.elementRef.nativeElement as HTMLElement;
    // const elementStyle = element.style;
    Object.assign(element.style, style);
  }

  private _createStyle(pos: Position): { [key: string]: string } {
    const { usePercentages, containerWidth, useCSSTransforms } = this.gridLayoutComponent;
    const { left, top, width, height } = pos;

    let style: { [key: string]: string };
    if (useCSSTransforms) {
      style = setTransform(pos);
    } else {
      style = setTopLeft(pos);

      if (usePercentages) {
        style.left = perc(left / containerWidth);
        style.left = perc(width / containerWidth);
      }
    }

    return style;
  }

  private _calcColWidth(): number {
    // the padding is container padding
    const { gutter, containerWidth, cols } = this.gridLayoutComponent;
    return (
      (containerWidth - gutter * (cols - 1) - gutter * 2) / cols
    );
  }

  private _calcPosition(gridRect: GridItemRect, state?: any): Position {
    // the padding is container padding
    const { gutter, colWidth, rowHeight } = this.gridLayoutComponent;
    const { x, y, w, h } = gridRect;

    const position: Position = {
      left: Math.round((colWidth + gutter) * x + gutter),
      top: Math.round((rowHeight + gutter) * y + gutter),
      width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * gutter),
      height: h === Infinity ? h : Math.round(rowHeight * h + Math.max(0, h - 1) * gutter)
    };

    if (state && state.resizing) {
      position.width = Math.round(state.resizeing.width);
      position.height = Math.round(state.resizeing.height);
    }

    if (state && state.dragging) {
      position.left = Math.round(state.dragging.left);
      position.top = Math.round(state.dragging.op);
    }

    return position;
  }

  private _calcXY(left: number, top: number): { x: number, y: number } {
    const { gutter, cols, rowHeight, maxRows, colWidth } = this.gridLayoutComponent;
    const { w, h } = this.rect;

    let x = Math.round((left - gutter) / (colWidth + gutter));
    let y = Math.round((top - gutter) / (rowHeight + gutter));

    // Capping
    x = Math.max(Math.min(x, cols - w), 0);
    y = Math.max(Math.min(y, maxRows - h), 0)

    return { x, y };
  }

  private _calcWH(width: number, height: number): { w: number, h: number } {
    const { gutter, cols, rowHeight, maxRows, colWidth } = this.gridLayoutComponent;
    const { x, y } = this.rect;

    let w = Math.round((width + gutter) / (colWidth + gutter));
    let h = Math.round((height + gutter) / (rowHeight + gutter));

    // Capping
    w = Math.max(Math.min(w, cols - x), 0);
    h = Math.max(Math.min(h, maxRows - y), 0);

    return { w, h };
  }

  @HostListener("resizeStart", ["$event"])
  onResizeStart($event) { }

  @HostListener("resize", ["$event"])
  onResize($event) {
    // const { x, y, width, height } = $event;
    const { cols } = this.gridLayoutComponent;
    const {x} = this.rect;

    let {w, h} = this._calcWH($event.width, $event.height);

    w = Math.min(w, cols - x);
    w = Math.max(w, 1);

    // TODO: Max / Min capping
    h = Math.max(h, 1);    

    this.rect.w = w;
    this.rect.h = h;
    // console.log(this.rect);
    this.patchStyle();
  }

  @HostListener("resizeEnd", ["$event"])
  onResizeEnd($event) { }


  @HostListener("dragStart", ["$event"])
  onDragStart($event) {
    // console.log("drag start", $event);
  }

  @HostListener("dragMove", ["$event"])
  onDragMove($event) {
    // console.log("drag move", $event);
    const {pointerPosition} = $event;
    const newPostion: {left: number, top: number} = {left: 0, top: 0};
    const parentRect = this.gridLayoutComponent.boundingClientRect;
    
    const {x, y} = this._calcXY(pointerPosition.x - parentRect.left, pointerPosition.y - parentRect.top);
    this.rect.x = x;
    this.rect.y = y;
    this.patchStyle();
  }

  @HostListener("dragEnd", ["$event"])
  onDragEnd($event) {
    // console.log("drag end", $event);
  }
}
