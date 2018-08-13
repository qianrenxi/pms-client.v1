import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AvatarListComponent } from './avatar-list/avatar-list.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
  ],
  declarations: [
    PageHeaderComponent,
    AvatarListComponent,
  ],
  exports: [
    PageHeaderComponent,
    AvatarListComponent,
  ]
})
export class NgAntdProModule {}
