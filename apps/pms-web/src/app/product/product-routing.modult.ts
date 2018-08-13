import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { StoryFolderComponent } from './story-folder/story-folder.component';
import { StoryListComponent } from './story-list/story-list.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { ReleaseListComponent } from './release-list/release-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { DocLibComponent } from './doc-lib/doc-lib.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';

const routes: Routes = [
    { path: '', component: ProductHomeComponent },
    { path: 'list', component: ProductListComponent },
    { path: ':id', component: ProductDetailComponent, children: [
        { path: '', redirectTo: 'summary', pathMatch: 'full'},
        {path: 'summary', component: ProductSummaryComponent },
        {path: 'story', component: StoryListComponent },
        {path: 'plan', component: PlanListComponent },
        {path: 'release', component: ReleaseListComponent },
        {path: 'project', component: ProjectListComponent },
        {path: 'docLib', component: DocLibComponent },
        {path: 'activity', component: ActivityListComponent },
        {path: 'roadmap', component: RoadmapComponent },
        {path: 'folder', component: StoryFolderComponent },
        {path: 'settings', component: ProductSettingsComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule { }

export const routedComponents = [
    ProductHomeComponent,
    ProductListComponent,
];