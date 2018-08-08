import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from './product-home/product-home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.modult';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [ProductHomeComponent]
})
export class ProductModule { }
