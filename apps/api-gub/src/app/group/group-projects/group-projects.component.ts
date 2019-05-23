import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-group-projects',
  templateUrl: './group-projects.component.html',
  styleUrls: ['./group-projects.component.scss']
})
export class GroupProjectsComponent implements OnInit {

  projects = [
    { id: 1, name: 'Project 1', description: 'The project description.', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png' },
    { id: 2, name: 'Project 2', description: 'The project description.', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png' },
    { id: 3, name: 'Project 3', description: 'The project description.', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
