import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.scss']
})
export class ReleaseListComponent implements OnInit {
  releases = [{ id: 1, name: '1.0版本', startDate: '' }];

  constructor() {}

  ngOnInit() {}
}
