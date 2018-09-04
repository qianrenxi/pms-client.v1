import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { DevelopingComponent } from './developing/developing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    MainLayoutComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    WelcomeComponent,
    DevelopingComponent
  ],
  exports: [
    MainLayoutComponent,
    WelcomeComponent,
    DevelopingComponent
  ]
})
export class LayoutModule { }
