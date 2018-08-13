import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectHomeComponent,
    ProjectListComponent,
    ProjectDetailComponent
  ]
})
export class ProjectModule {}
