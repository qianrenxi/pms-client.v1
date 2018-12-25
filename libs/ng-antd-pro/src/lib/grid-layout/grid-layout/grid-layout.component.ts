import { Component, OnInit, ElementRef, HostBinding, Input, ContentChildren, QueryList, HostListener, AfterViewInit, AfterContentInit, EventEmitter } from '@angular/core';
import { GridItemComponent } from '../grid-item/grid-item.component';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounce';
import { GridLayoutService } from '../grid-layout.service';

@Component({
  selector: 'ap-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
  providers: [
    GridLayoutService
  ]
})
export class GridLayoutComponent implements OnInit, AfterContentInit {

  // @Input() style: any;
  @Input() width: number;
  @Input() autoSize = true;
  @Input() cols = 12;
  @Input() verticalCompact = true;
  @Input() compactType: 'horizontal' | 'vertical' = 'vertical';
  @Input() gutter = 8; // 间隙
  @Input() rowHeight = 150;
  @Input() rowHeightRate = 0.6125; // 设置 rowHeightRate 后 row height 将自动失效
  @Input() maxRows = Infinity;
  @Input() isDraggable = true;
  @Input() isResizable = true;
  @Input() preventCollision = false;
  @Input() useCSSTransforms = true;
  @Input() usePercentages = false;

  colWidth: number;
  // layout: LayoutItem[];
  
  // WARNING in Circular dependency detected:
  // @ContentChildren(GridItemComponent) items: QueryList<GridItemComponent>;

  boundingClientRect: ClientRect | DOMRect;

  resizeEvent = new EventEmitter();

  @HostBinding("class.ap-grid-layout")
  apGridLayoutStyleClass = true;

  @HostListener("window:resize", ['$event'])
  onResize($event) {
    // TODO: 使用 Observable 的 debounce 防抖动
    this.updateRect();
  }

  get containerWidth() {
    const rect = this.boundingClientRect = this._calcContainerRect();
    return rect.width;
  }

  constructor(
    protected elementRef: ElementRef
  ) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.updateRect();
    // }, 300);
  }

  ngAfterContentInit() {
    this.updateRect();
  }

  updateRect() {
    const rect = this.boundingClientRect = this._calcContainerRect();
    console.log(rect)
    this.colWidth = rect.width / this.cols;
    if (this.rowHeightRate) {
      this.rowHeight = this.colWidth * this.rowHeightRate;
    }

    this.resizeEvent.emit({});
  }

  private _calcContainerRect(): ClientRect | DOMRect {
    const element = this.elementRef.nativeElement as HTMLElement;
    const boundingClientRect = element.getBoundingClientRect();
    // this.boundingClientRect = boundingClientRect;
    return boundingClientRect;
  }
}
