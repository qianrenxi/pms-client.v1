import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiBuilderRoutingModule } from './api-builder-routing.module';
import { ApiBuilderMainComponent } from './api-builder-main/api-builder-main.component';
import { SharedModule } from '../shared/shared.module';
import { ApiTreeComponent } from './api-tree/api-tree.component';
import { ApiEditorComponent } from './api-editor/api-editor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApiBuilderRoutingModule
  ],
  declarations: [ApiBuilderMainComponent, ApiTreeComponent, ApiEditorComponent]
})
export class ApiBuilderModule { }
