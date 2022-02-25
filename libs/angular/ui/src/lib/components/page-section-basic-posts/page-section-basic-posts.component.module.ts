import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { BasicPostModule } from '../basic-post';
import { PageSectionBasicPostsComponent } from './page-section-basic-posts.component';

@NgModule({
  declarations: [PageSectionBasicPostsComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    BasicPostModule,
  ],
  exports: [PageSectionBasicPostsComponent],
})
export class PageSectionBasicPostsModule {}
