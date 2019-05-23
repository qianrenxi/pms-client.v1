import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupHomeComponent } from './group-home/group-home.component';
import { GroupSummaryComponent } from './group-summary/group-summary.component';
import { GroupProjectsComponent } from './group-projects/group-projects.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupActivitiesComponent } from './group-activities/group-activities.component';

const routes: Routes = [
  { path: '', component: GroupHomeComponent },
  {
    path: ':id', component: GroupDetailComponent, children: [
      { path: '', component: GroupSummaryComponent },
      { path: 'projects', component: GroupProjectsComponent },
      { path: 'members', component: GroupMembersComponent },
      { path: 'activities', component: GroupActivitiesComponent },
      { path: 'setting', component: GroupEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
