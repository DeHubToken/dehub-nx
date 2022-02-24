import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { FeaturePostModule } from '../feature-post';
import { PageSectionFeaturePostsComponent } from './page-section-feature-posts.component';

@NgModule({
  declarations: [PageSectionFeaturePostsComponent],
  imports: [
    // Angular
    CommonModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    FeaturePostModule,
  ],
  exports: [PageSectionFeaturePostsComponent],
})
export class PageSectionFeaturePostsModule {}
