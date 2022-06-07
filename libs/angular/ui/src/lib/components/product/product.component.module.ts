import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import SwiperCore, { Lazy, Pagination } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ProductComponent } from './product.component';

// Install Swiper modules
SwiperCore.use([Pagination, Lazy]);

@NgModule({
  declarations: [ProductComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    ButtonModule,
    CardModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [ProductComponent],
})
export class ProductModule {}
