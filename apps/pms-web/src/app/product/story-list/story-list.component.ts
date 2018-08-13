import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  stories = [
    { id: 1, title: '关于我们的设计和开发', plan: '版本更新12' },
    { id: 1, title: '关于我们的设计和开发', plan: '版本更新12' }
  ];

  constructor() {}

  ngOnInit() {}
}
