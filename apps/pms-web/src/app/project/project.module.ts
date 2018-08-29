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
import { BugListComponent } from './bug-list/bug-list.component';
import { BuildListComponent } from './build-list/build-list.component';
import { TestTaskListComponent } from './test-task-list/test-task-list.component';
import { StoryListComponent } from './story-list/story-list.component';

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
    TaskGantListComponent,
    BugListComponent,
    BuildListComponent,
    TestTaskListComponent,
    StoryListComponent
  ]
})
export class ProjectModule {}
