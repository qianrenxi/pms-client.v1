import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from './product-home/product-home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.modult';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { StoryFolderComponent } from './story-folder/story-folder.component';
import { EpicComponent } from './epic/epic.component';
import { StoryListComponent } from './story-list/story-list.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { FolderTreeComponent } from './folder-tree/folder-tree.component';
import { ReleaseListComponent } from './release-list/release-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { DocLibComponent } from './doc-lib/doc-lib.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [ProductHomeComponent, ProductListComponent, ProductDetailComponent, ProductSummaryComponent, StoryFolderComponent, EpicComponent, StoryListComponent, PlanListComponent, FolderTreeComponent, ReleaseListComponent, ProjectListComponent, DocLibComponent, ActivityListComponent, RoadmapComponent, ProductSettingsComponent]
})
export class ProductModule { }
