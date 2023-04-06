import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { PersonPostModule } from '../person-post';
import { PageSectionPersonPostsSwiperComponent } from './page-section-person-posts-swiper.component';

// Install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Swiper
    SwiperModule,
    // Libs
    ContentfulDraftDirectiveModule,
    PersonPostModule,
    PageSectionPersonPostsSwiperComponent,
  ],
  exports: [PageSectionPersonPostsSwiperComponent],
})
export class PageSectionPersonPostsSwiperModule {}
