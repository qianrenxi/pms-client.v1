import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit {
  
  members = [
    {id: 1, name: 'zhangsan', email: 'zgangsan@parim.net', role: '主程序猿', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png'},
    {id: 2, name: 'zhangsan', email: 'zgangsan@parim.net', role: '主程序猿', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png'},
    {id: 3, name: 'zhangsan', email: 'zgangsan@parim.net', role: '主程序猿', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png'},
    {id: 4, name: 'zhangsan', email: 'zgangsan@parim.net', role: '主程序猿', avatar: 'http://git.parim.net/assets/no_group_avatar-7593f7fb9461d2ab8c9f62f4e055f021.png'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
