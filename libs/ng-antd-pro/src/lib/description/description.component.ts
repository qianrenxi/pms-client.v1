import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ap-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() term: string;

  constructor() { }

  ngOnInit() {
  }

}
