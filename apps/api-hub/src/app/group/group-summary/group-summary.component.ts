import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-group-summary',
  templateUrl: './group-summary.component.html',
  styleUrls: ['./group-summary.component.scss']
})
export class GroupSummaryComponent implements OnInit {

  idx = 0;

  projects = [
    { id: 1, name: 'Project 1', description: 'The project description.', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png' },
    { id: 2, name: 'Project 2', description: 'The project description.', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png' },
    { id: 3, name: 'Project 3', description: 'The project description.', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
