import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import SwiperCore, { Lazy, Pagination } from 'swiper';
import { ProductMiniComponent } from './product-mini.component';

// Install Swiper modules
SwiperCore.use([Pagination, Lazy]);

@NgModule({
  declarations: [ProductMiniComponent],
  imports: [
    // Angular
    CommonModule,
  ],
  exports: [ProductMiniComponent],
})
export class ProductMiniModule {}
