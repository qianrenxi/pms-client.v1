import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-drag-drop2',
  templateUrl: './drag-drop2.component.html',
  styleUrls: ['./drag-drop2.component.scss']
})
export class DragDrop2Component implements OnInit {

  itemList = [];

  constructor() { }

  ngOnInit() {
    this.itemList = [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
    ];
  }

}
