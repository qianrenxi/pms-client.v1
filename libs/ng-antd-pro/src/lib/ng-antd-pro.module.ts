import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AvatarListComponent } from './avatar-list/avatar-list.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { ExceptionComponent } from './exception/exception.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
  ],
  declarations: [
    PageHeaderComponent,
    AvatarListComponent,
    ResultComponent,
    ExceptionComponent,
  ],
  exports: [
    PageHeaderComponent,
    AvatarListComponent,
    ResultComponent,
    ExceptionComponent,
  ]
})
export class NgAntdProModule {}
