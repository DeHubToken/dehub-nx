import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template/push';
import { PageSectionBasicPostsModule } from '../page-section-basic-posts';
import { PageSectionDappPostsModule } from '../page-section-dapp-posts';
import { PageSectionFaQsModule } from '../page-section-faqs';
import { PageSectionFeaturePostsModule } from '../page-section-feature-posts';
import { PageSectionGrandPostsModule } from '../page-section-grand-posts';
import { PageSectionGrandPostsSwiperModule } from '../page-section-grand-posts-swiper';
import { PageSectionIconTilesModule } from '../page-section-icon-tiles';
import { PageSectionIconTilesSwiperModule } from '../page-section-icon-tiles-swiper';
import { PageSectionPersonPostsModule } from '../page-section-person-posts';
import { PageSectionPersonPostsSwiperModule } from '../page-section-person-posts-swiper';
import { PageSectionProductsModule } from '../page-section-products';
import { PageSectionSectionPostsModule } from '../page-section-section-posts';
import { PageSectionThumbnailPostsModule } from '../page-section-thumbnail-posts';
import { PageSectionsComponent } from './page-sections.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    // Libs
    PageSectionFeaturePostsModule,
    PageSectionThumbnailPostsModule,
    PageSectionBasicPostsModule,
    PageSectionIconTilesModule,
    PageSectionIconTilesSwiperModule,
    PageSectionFaQsModule,
    PageSectionDappPostsModule,
    PageSectionGrandPostsSwiperModule,
    PageSectionGrandPostsModule,
    PageSectionSectionPostsModule,
    PageSectionPersonPostsSwiperModule,
    PageSectionPersonPostsModule,
    PageSectionProductsModule,
    // Rx Angular
    PushModule,
    PageSectionsComponent,
  ],
  exports: [PageSectionsComponent],
})
export class PageSectionsModule {}
