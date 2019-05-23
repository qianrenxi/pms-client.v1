import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    ProjectRoutingModule,
  ],
  declarations: [
    ProjectHomeComponent,
    ProjectDetailComponent,
    ProjectSummaryComponent,
  ]
})
export class ProjectModule { }
