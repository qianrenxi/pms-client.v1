import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
    { path: '', component: ProductHomeComponent },
    { path: 'list', component: ProductListComponent },
    { path: ':id', component: ProductDetailComponent, children: [
        
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