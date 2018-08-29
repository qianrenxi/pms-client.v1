import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  filters = [
    { label: '打开的任务', value: 1 },
    { label: '指派给我的任务', value: 2 },
  ];

  tasks = [];

  constructor() { }

  ngOnInit() {
  }

}
