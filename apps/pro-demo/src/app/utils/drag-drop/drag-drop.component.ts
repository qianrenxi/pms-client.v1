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

  onSort({newIndex, currentIndex}) {
    // 这个是置换
    // this.sortableList.splice(newIndex, 1, ...this.sortableList.splice(currentIndex, 1, this.sortableList[newIndex]));

    // 将元素移到新的位置，其余顺延（这种处理更合理）
    if (newIndex === currentIndex) {
      return;
    }

    this.ngZone.run(() =>{ // 为了及时触发视图变更
      const currObj = this.sortableList[currentIndex];
      if (currentIndex > newIndex) {
        this.sortableList.splice(newIndex, 0, currObj);
        this.sortableList.splice(currentIndex + 1, 1);
      } else {
        this.sortableList.splice(newIndex + 1, 0, currObj);
        this.sortableList.splice(currentIndex, 1);
      }
      // this.sortableList = [...this.sortableList]; // 此方法也不能及时触发视图变更
    });

    // console.log('sorted.................')
  }

}
