import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'ah-api-builder-main',
  templateUrl: './api-builder-main.component.html',
  styleUrls: ['./api-builder-main.component.scss']
})
export class ApiBuilderMainComponent implements OnInit {
  panels = [
    {
      active: true,
      name  : 'Collenction 1',
    },
    {
      active: false,
      name  : 'Collection 2'
    }
  ];
  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit() {
  }

  stopCollapse(e: MouseEvent) {
    e.stopPropagation();
  }

  openAddCollection(contentTpl) {
    this.modal.create({
      nzTitle: 'Create a new collection',
      nzContent: contentTpl,
      nzWidth: 960,
      nzMaskClosable: false
    });
  }

  openAddFolder(contentTpl) {
    this.modal.create({
      nzTitle: 'Add folder to 企慕课堂部署版学员端',
      nzContent: contentTpl,
      nzWidth: 960,
      nzMaskClosable: false
    });
  }
}
