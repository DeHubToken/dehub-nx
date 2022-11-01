import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ProductModule } from '../product';
import { TabMenuModule } from '../tab-menu';
import { PageSectionProductsComponent } from './page-section-products.component';

// Install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  declarations: [PageSectionProductsComponent],
  imports: [
    // Angular
    CommonModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    ProductModule,
    TabMenuModule,

    // Rx
    PushModule,
  ],
  exports: [PageSectionProductsComponent],
})
export class PageSectionProductsModule {}
