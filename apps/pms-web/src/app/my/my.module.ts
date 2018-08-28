import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHomeComponent } from './my-home/my-home.component';
import { SharedModule } from '../shared/shared.module';
import { MyRoutingModule } from './my-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyRoutingModule
  ],
  declarations: [
    MyHomeComponent
  ]
})
export class MyModule { }
