import { Component, OnInit, NgZone } from '@angular/core';

function remove(item: string, list: string[]) {
  if (list.indexOf(item) !== -1) {
    list.splice(list.indexOf(item), 1);
  }
}

@Component({
  selector: 'demo-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  sortableList: string[] = [];

  sortableList1: string[] = [];
  sortableList2: string[] = [];

  draggingData?: any;

  constructor(
    private ngZone: NgZone
  ) {
    this.sortableList = [
      'Sortable Item 1',
      'Sortable Item 2',
      'Sortable Item 3',
      'Sortable Item 4',
      'Sortable Item 5',
    ];

    this.sortableList1 = this.sortableList.map(it => `Left: ${it}`);
    this.sortableList2 = this.sortableList.map(it => `Right: ${it}`);
  }

  ngOnInit() {
  }

  onDragStart(data) {
    console.log('start', data)
    this.draggingData = data;
  }

  onDragEnd() {
    this.draggingData = null;
  }

  onSort(list: any[], {newIndex, currentIndex}) {
    // 这个是置换
    // this.sortableList.splice(newIndex, 1, ...this.sortableList.splice(currentIndex, 1, this.sortableList[newIndex]));

    // 将元素移到新的位置，其余顺延（这种处理更合理）
    if (newIndex === currentIndex) {
      return;
    }

    this.ngZone.run(() =>{ // 为了及时触发视图变更
      const currObj = list[currentIndex];
      if (currentIndex > newIndex) {
        list.splice(newIndex, 0, currObj);
        list.splice(currentIndex + 1, 1);
      } else {
        list.splice(newIndex + 1, 0, currObj);
        list.splice(currentIndex, 1);
      }
      // this.sortableList = [...this.sortableList]; // 此方法也不能及时触发视图变更
    });

    // console.log('sorted.................')
  }

  onAppend(list: any[], {targetIndex}) {
    // console.log('appending.............', this.draggingData, targetIndex)
    const oldId = this.sortableList.indexOf(this.draggingData);
    if (oldId >= 0) {
      this.sortableList.splice(oldId, 1);
    }

    if (!!this.draggingData) {
      this.ngZone.run(() =>{
        list.splice(targetIndex, 0, this.draggingData);
      });

      this.draggingData = undefined;
    }
  }

}
