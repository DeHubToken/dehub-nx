import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { FeaturePostModule } from '../feature-post';
import { PageSectionFeaturePostsComponent } from './page-section-feature-posts.component';

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
    FeaturePostModule,
    PageSectionFeaturePostsComponent,
  ],
  exports: [PageSectionFeaturePostsComponent],
})
export class PageSectionFeaturePostsModule {}
