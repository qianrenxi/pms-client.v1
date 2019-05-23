import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupHomeComponent } from './group-home/group-home.component';
import { SharedModule } from '../shared/shared.module';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupSummaryComponent } from './group-summary/group-summary.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { GroupProjectsComponent } from './group-projects/group-projects.component';
import { GroupActivitiesComponent } from './group-activities/group-activities.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GroupRoutingModule
  ],
  declarations: [
    GroupHomeComponent,
    GroupDetailComponent,
    GroupSummaryComponent,
    GroupEditComponent,
    GroupMembersComponent,
    GroupProjectsComponent,
    GroupActivitiesComponent,
  ]
})
export class GroupModule { }
