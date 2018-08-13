import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { StepFormComponent } from './step-form/step-form.component';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsRoutingModule
  ],
  declarations: [BasicFormComponent, StepFormComponent, AdvancedFormComponent]
})
export class FormsModule { }
