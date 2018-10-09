import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UtilsRoutingModule } from './utils-routing.module';
import { DragDropComponent } from './drag-drop/drag-drop.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UtilsRoutingModule,
  ],
  declarations: [
    DragDropComponent,
  ]
})
export class UtilsModule { }
