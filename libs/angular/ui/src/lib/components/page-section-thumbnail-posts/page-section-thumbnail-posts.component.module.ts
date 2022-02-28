import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionThumbnailPostsComponent } from '@dehub/angular/ui/components/page-section-thumbnail-posts/page-section-thumbnail-posts.component';
import { ThumbnailPostModule } from '@dehub/angular/ui/components/thumbnail-post';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';

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
