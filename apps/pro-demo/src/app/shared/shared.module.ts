import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { NgAntdProModule } from '@qianrenxi/ng-antd-pro';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    NgAntdProModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    NgAntdProModule
  ]
})
export class SharedModule { }
