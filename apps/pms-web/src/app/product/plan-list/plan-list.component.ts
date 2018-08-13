import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
  plans = [{ id: 1, name: '1.0版本', startDate: '' }];

  constructor() {}

  ngOnInit() {}
}
