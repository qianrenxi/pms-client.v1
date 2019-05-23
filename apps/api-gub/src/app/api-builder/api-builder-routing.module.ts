import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiBuilderMainComponent } from './api-builder-main/api-builder-main.component';

const routes: Routes = [
  {path: '', component: ApiBuilderMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiBuilderRoutingModule { }
