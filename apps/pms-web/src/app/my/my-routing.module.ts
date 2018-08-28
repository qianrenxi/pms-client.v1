import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHomeComponent } from './my-home/my-home.component';

const routes: Routes = [
  { path: '', component: MyHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRoutingModule { }

export const routedComponents = [
    MyHomeComponent
];