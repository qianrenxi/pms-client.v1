import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { DevelopingComponent } from '../layout/developing/developing.component';

const routes: Routes = [
  { path: '', component: ProjectHomeComponent },
  {
    path: ':id', component: ProjectDetailComponent, children: [
      { path: '', component: ProjectSummaryComponent },
      {
        path: '', children: [
          { path: 'builder', loadChildren: '../api-builder/api-builder.module#ApiBuilderModule' },
          { path: '**', component: DevelopingComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
