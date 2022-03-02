import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { BasicPostModule } from '../basic-post';
import { PageSectionBasicPostsComponent } from './page-section-basic-posts.component';

// Install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  declarations: [PageSectionBasicPostsComponent],
  imports: [
    // Angular
    CommonModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    BasicPostModule,
  ],
  exports: [PageSectionBasicPostsComponent],
})
export class PageSectionBasicPostsModule {}
