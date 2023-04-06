import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import SwiperCore, { Lazy, Pagination } from 'swiper';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ProductMiniComponent } from './product-mini.component';

// Install Swiper modules
SwiperCore.use([Pagination, Lazy]);

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Lib
    ContentfulDraftDirectiveModule,
    ProductMiniComponent,
  ],
  exports: [ProductMiniComponent],
})
export class ProductMiniModule {}
