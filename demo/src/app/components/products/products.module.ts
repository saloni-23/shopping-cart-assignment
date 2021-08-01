import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products-component/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, FormsModule],
})
export class ProductsModule {}
