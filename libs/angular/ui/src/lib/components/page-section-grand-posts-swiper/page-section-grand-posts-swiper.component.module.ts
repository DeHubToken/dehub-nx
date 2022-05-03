import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { GrandPostModule } from '../grand-post';
import { PageSectionGrandPostsSwiperComponent } from '../page-section-grand-posts-swiper/page-section-grand-posts-swiper.component';

// Install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  declarations: [PageSectionGrandPostsSwiperComponent],
  imports: [
    // Angular
    CommonModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    GrandPostModule,
  ],
  exports: [PageSectionGrandPostsSwiperComponent],
})
export class PageSectionGrandPostsSwiperModule {}
