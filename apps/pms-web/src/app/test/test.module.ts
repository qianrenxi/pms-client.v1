import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestHomeComponent } from './test-home/test-home.component';
import { SharedModule } from '../shared/shared.module';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TestRoutingModule
  ],
  declarations: [
    TestHomeComponent
  ]
})
export class TestModule { }
