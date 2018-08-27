import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ap-description, ap-desc',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() term: string;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
