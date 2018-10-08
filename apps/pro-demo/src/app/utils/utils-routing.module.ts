import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DragDrop2Component } from './drag-drop2/drag-drop2.component';


const routes: Routes = [
  { path: 'dragDrop', component: DragDropComponent },
  { path: 'dragDrop2', component: DragDrop2Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilsRoutingModule { }

export const routedComponents = [
    DragDropComponent,
    DragDrop2Component,
];