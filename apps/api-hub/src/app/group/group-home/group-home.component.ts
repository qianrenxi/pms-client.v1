import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {

  myGroups = [
    { id: 1, name: 'Group 1', avatar: 'http://git.parim.net/uploads/group/avatar/212/34739_20160315114258.gif', projectCount: 3, userCount: 15, identity: '所有者' },
    { id: 2, name: 'Group 2', avatar: 'http://git.parim.net/uploads/group/avatar/174/TIM%E5%9B%BE%E7%89%8720180226105324.png', projectCount: 3, userCount: 15, identity: '所有者' },
    { id: 3, name: 'Group 3', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png', projectCount: 3, userCount: 15, identity: '所有者' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
