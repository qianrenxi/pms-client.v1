import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AvatarListComponent } from './avatar-list/avatar-list.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { ExceptionComponent } from './exception/exception.component';
import { DescriptionComponent } from './description/description.component';
import { DescriptionListComponent } from './description-list/description-list.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { DragDropModule } from './drag-drop/drag-drop.module';
import { DragDrop2Module } from './drag-drop2/drag-drop2.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    DynamicFormModule,
    DragDropModule,
    DragDrop2Module,
  ],
  declarations: [
    PageHeaderComponent,
    AvatarListComponent,
    ResultComponent,
    ExceptionComponent,
    DescriptionComponent,
    DescriptionListComponent,
  ],
  exports: [
    DynamicFormModule,
    DragDropModule,
    DragDrop2Module,
    PageHeaderComponent,
    AvatarListComponent,
    ResultComponent,
    ExceptionComponent,
    DescriptionComponent,
    DescriptionListComponent,
  ]
})
export class NgAntdProModule {}
