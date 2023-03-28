import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { PersonPostComponent } from '../person-post';
import { PageSectionPersonPostsSwiperComponent } from './page-section-person-posts-swiper.component';

// Install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  declarations: [PageSectionPersonPostsSwiperComponent],
  imports: [
    // Angular
    CommonModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    PersonPostComponent,
  ],
  exports: [PageSectionPersonPostsSwiperComponent],
})
export class PageSectionPersonPostsSwiperModule {}
