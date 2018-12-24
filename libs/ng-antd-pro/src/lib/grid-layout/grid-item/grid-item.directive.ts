import { Directive, Optional, Host, ElementRef } from '@angular/core';
import { GridItemComponent } from './grid-item.component';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { ResizableDirective } from '../../drag-drop/resizable.directive';
import { GridLayoutService } from '../grid-layout.service';

@Directive({
  selector: '[apGridItem], [apGridItem], [ap-grid-item]'
})
export class GridItemDirective extends GridItemComponent {

  constructor(
    protected elementRef: ElementRef,
    @Optional() @Host() protected gridLayoutComponent: GridLayoutComponent,
    @Optional() @Host() protected gridLayoutService: GridLayoutService,
  ) {
    super(
      elementRef,
      gridLayoutComponent,
      gridLayoutService,
    );
  }

}
