import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SharedModule } from '../../../../api-hub/src/app/shared/shared.module';
import { UtilsRoutingModule } from './utils-routing.module';
import { DragDrop2Component } from './drag-drop2/drag-drop2.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UtilsRoutingModule,
  ],
  declarations: [
    DragDropComponent,
    DragDrop2Component,
  ]
})
export class UtilsModule { }
