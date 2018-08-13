import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [{ id: 1, name: '1.0版本', startDate: '' }];
  constructor() {}

  ngOnInit() {}
}
