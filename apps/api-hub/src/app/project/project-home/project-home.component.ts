import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {

  myProjects = [
    {id: 1, name: 'Project 1', description: 'The project description.', apiCount: 100, docCount: 3, avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png', group: {id: 1, name: 'Group 1'}},
    {id: 2, name: 'Project 2', description: 'The project description.', apiCount: 100, docCount: 3, avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png', group: {id: 1, name: 'Group 1'}},
    {id: 3, name: 'Project 3', description: 'The project description.', apiCount: 100, docCount: 3, avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
