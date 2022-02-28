import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { PageSectionThumbnailPostsComponent } from '../page-section-thumbnail-posts/page-section-thumbnail-posts.component';
import { ThumbnailPostModule } from '../thumbnail-post';

// Install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  declarations: [PageSectionThumbnailPostsComponent],
  imports: [
    // Angular
    CommonModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    ThumbnailPostModule,
  ],
  exports: [PageSectionThumbnailPostsComponent],
})
export class PageSectionThumbnailPostsModule {}
