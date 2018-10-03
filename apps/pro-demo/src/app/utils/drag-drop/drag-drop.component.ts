import { Component, OnInit } from '@angular/core';

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
  sortableList = [];

  availableBoxes = [];
  dropzone1 = [];
  dropzone2 = [];
  currentBox?: string;

  constructor() {
    for (let i = 1; i <= 15; i++) {
      this.sortableList.push(`Box ${i}`);
    }

    for (let i = 1; i <= 5; i++) {
      this.availableBoxes.push(`Box ${i}`);
    }
    for (let i = 6; i <= 8; i++) {
      this.dropzone1.push(`Box ${i}`);
    }
    for (let i = 9; i <= 10; i++) {
      this.dropzone2.push(`Box ${i}`);
    }
  }

  ngOnInit() {
  }

  sort(event: {currentIndex: number, newIndex: number}) {
    const current = this.sortableList[event.currentIndex];
    const swapWith = this.sortableList[event.newIndex];
    
    this.sortableList[event.newIndex] = current;
    this.sortableList[event.currentIndex] = swapWith;
  }

  move(box: string, toList: string[]): void {
    remove(box, this.availableBoxes);
    remove(box, this.dropzone1);
    remove(box, this.dropzone2);

    toList.push(box);
  }

}
