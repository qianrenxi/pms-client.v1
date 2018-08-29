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
import { StoryListComponent } from './story-list/story-list.component';
import { BugListComponent } from './bug-list/bug-list.component';
import { BuildListComponent } from './build-list/build-list.component';
import { TestTaskListComponent } from './test-task-list/test-task-list.component';

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
            ]},
            { path: 'story', component: StoryListComponent },
            { path: 'bug', component: BugListComponent },
            { path: 'build', component: BuildListComponent },
            { path: 'testTask', component: TestTaskListComponent }
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
    StoryListComponent,
    BugListComponent,
    BuildListComponent,
    TestTaskListComponent,
];