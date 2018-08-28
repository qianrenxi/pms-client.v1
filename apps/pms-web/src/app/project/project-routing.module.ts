import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskGroupListComponent } from './task-group-list/task-group-list.component';
import { TaskTreeListComponent } from './task-tree-list/task-tree-list.component';
import { TaskGantListComponent } from './task-gant-list/task-gant-list.component';

const routes: Routes = [
    { path: '', component: ProjectHomeComponent },
    { path: 'list', component: ProjectListComponent },
    {
        path: ':projectId', component: ProjectDetailComponent, children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full'},
            { path: 'summary', component: ProjectSummaryComponent},
            { path: 'task', children: [
                { path: '', redirectTo: 'list', pathMatch: 'full'},
                { path: 'list', component: TaskListComponent },
                { path: 'group', component: TaskGroupListComponent },
                { path: 'tree', component: TaskTreeListComponent },
                { path: 'gant', component: TaskGantListComponent },
            ]}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectRoutingModule { }

export const routedComponents = [
    ProjectHomeComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectSummaryComponent,
    TaskListComponent,
    TaskGroupListComponent,
    TaskTreeListComponent,
    TaskGantListComponent,
];