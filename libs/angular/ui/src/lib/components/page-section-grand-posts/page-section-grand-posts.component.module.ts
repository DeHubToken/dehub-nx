import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { GrandPostModule } from '../grand-post';
import { PageSectionGrandPostsComponent } from '../page-section-grand-posts/page-section-grand-posts.component';

// Install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  declarations: [PageSectionGrandPostsComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    GrandPostModule,
  ],
  exports: [PageSectionGrandPostsComponent],
})
export class PageSectionGrandPostsModule {}
