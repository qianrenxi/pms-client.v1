import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', component: WelcomeComponent },
            { path: 'product', loadChildren: './product/product.module#ProductModule'}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [];