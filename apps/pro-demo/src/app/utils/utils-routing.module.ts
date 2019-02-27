import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SplitterComponent } from './splitter/splitter.component';


const routes: Routes = [
  { path: 'dragDrop', component: DragDropComponent },
  { path: 'splitter', component: SplitterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilsRoutingModule { }

export const routedComponents = [
    DragDropComponent,
];