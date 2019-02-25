import { Directive, AfterContentInit, ElementRef, ContentChildren, QueryList, Output, EventEmitter, HostBinding } from '@angular/core';
import { DropContainer } from './drop-container';
import { SortableDirective } from './sortable.directive';
import { toArray } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

@Directive({
  selector: '[apSortableList]'
})
export class SortableListDirective implements DropContainer, AfterContentInit {

  private _subscriptions: Subscription[] = [];

  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;

  @Output() sort = new EventEmitter<SortEvent>();
  @Output() append = new EventEmitter<any>();

  @HostBinding('class.sortable-list') sortableListStyleClass = true;

  constructor(
    public element: ElementRef<HTMLElement>
  ) { }

  ngAfterContentInit() {
    this.sortables.changes.subscribe(() => {
      this._subscriptions.forEach(s => s.unsubscribe());
      this.sortables.forEach(sortable => {
        // sortable.dragStart.subscribe(() => this._measureClientRects());
        // sortable.dragMove.subscribe(e => this.detectSorting(sortable, e)); // 这种处理方式会实时更新DataModel，不是想要的结果
        this._subscriptions.push(
          sortable.sortableDrop.subscribe(e => this._onDrop(e))
        );
      });
    });
    
    this.sortables.notifyOnChanges();
  }

  private _measureClientRects() {
    
  }

  // TODO：当列表为空的时候并没有触发此事件，这是有问题的
  private _onDrop({source, target}) {
    // console.log(source.element.nativeElement === target.element.nativeElement)
    // console.log(source, target);
    const _source = this.sortables.find(it => source.element.nativeElement === it.element.nativeElement);
    // console.log(_source, target);
    if (this.sortables.some(it => it === _source)) {
      // 源在目标列表中，排序
      const sourceIndex = this.sortables.toArray().indexOf(_source);
      let targetIndex = this.sortables.toArray().indexOf(target);

      const size = this.sortables.length;
      if (sourceIndex > targetIndex && target.dropPosition === 1) {
        targetIndex = targetIndex + 1 < size ? targetIndex + 1 : size -1;
      } else if (sourceIndex < targetIndex && target.dropPosition === -1) {
        targetIndex = targetIndex - 1 > 0 ? targetIndex - 1 : 0;
      }

      this.sort.emit({newIndex: targetIndex, currentIndex: sourceIndex});
      return;
    } else {
      // 源不在目标列表中
      let targetIndex = this.sortables.toArray().indexOf(target);
      // targetIndex = targetIndex + target.dropPosition;
      // const size = this.sortables.length;
      // if (targetIndex < 0) {
      //   targetIndex = 0
      // } else if (targetIndex > size -1) {
      //   targetIndex = size - 1;
      // }
      if (target.dropPosition === 0 || target.dropPosition === 1) {
        targetIndex = targetIndex + 1;
        // const size = this.sortables.length;
        // if (targetIndex > size -1) {
        //   targetIndex = size - 1;
        // }
      }
      this.append.emit({source: source, targetIndex: targetIndex});
    }
    

    // TODO: 当source不在tartget所在的SortableList中时，触发 Insert 事件，而非sort事件。（是否触发这个事件可以添加一个可配置参数，具有DropZone的特性，缺点是和DronZone特性冗余）（是否可以绑定到DropZone指令中，如果外围有Dropzone指令时生效，缺点是，当SortableList和DropZone指令配置到同一个元素上时怎生效的问题，即在Sortable怎么检查同时具备DropZone特性，好像可以实现，寻找下解决办法）
    // inset 是 copy 还是Move得解决，这个倒是可以在Model层处理，这里不需要关心
  }

}
