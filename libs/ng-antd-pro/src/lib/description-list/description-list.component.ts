import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ap-description-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss']
})
export class DescriptionListComponent implements OnInit {
  
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
