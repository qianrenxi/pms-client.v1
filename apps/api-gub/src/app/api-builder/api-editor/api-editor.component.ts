import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ah-api-editor',
  templateUrl: './api-editor.component.html',
  styleUrls: ['./api-editor.component.scss']
})
export class ApiEditorComponent implements OnInit {

  baseInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.baseInfoForm = this.fb.group({
      name: [],
      url: [],
      collection: [],
      folder: [],
      enabled: [],
      requestMethod: [],
      requestProtol: [],
      requestType: [],
      responseType: [],
      flags: [],
      ignorePublicParam: [],
      developStatus: [],
      owner: [], // 责任人
      tags: [],
      description: [],
      requests: [], // 请求参数
      response: [], // 响应信息
    });
  }

  _submitForm(e, v) {}
}
