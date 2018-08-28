import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskGroupListComponent } from './task-group-list/task-group-list.component';
import { TaskTreeListComponent } from './task-tree-list/task-tree-list.component';
import { TaskGantListComponent } from './task-gant-list/task-gant-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectHomeComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectSummaryComponent,
    TaskListComponent,
    TaskGroupListComponent,
    TaskTreeListComponent,
    TaskGantListComponent
  ]
})
export class ProjectModule {}
