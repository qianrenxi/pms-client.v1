import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  
  stories = [
    { id: 1, title: '关于我们的设计和开发', plan: '版本更新12' },
    { id: 1, title: '关于我们的设计和开发', plan: '版本更新12' }
  ];
  
  constructor() {}

  ngOnInit() {}
}
