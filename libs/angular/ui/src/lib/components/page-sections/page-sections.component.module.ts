import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionBasicPostsModule } from '../page-section-basic-posts';
import { PageSectionDappPostsModule } from '../page-section-dapp-posts';
import { PageSectionFaQsModule } from '../page-section-faqs';
import { PageSectionFeaturePostsModule } from '../page-section-feature-posts';
import { PageSectionGrandPostsModule } from '../page-section-grand-posts';
import { PageSectionIconTilesModule } from '../page-section-icon-tiles';
import { PageSectionIconTilesSwiperModule } from '../page-section-icon-tiles-swiper';
import { PageSectionSectionPostsModule } from '../page-section-section-posts';
import { PageSectionThumbnailPostsModule } from '../page-section-thumbnail-posts';
import { PageSectionsComponent } from './page-sections.component';

@NgModule({
  declarations: [PageSectionsComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    PageSectionFeaturePostsModule,
    PageSectionThumbnailPostsModule,
    PageSectionBasicPostsModule,
    PageSectionIconTilesModule,
    PageSectionIconTilesSwiperModule,
    PageSectionFaQsModule,
    PageSectionDappPostsModule,
    PageSectionGrandPostsModule,
    PageSectionSectionPostsModule,
  ],
  exports: [PageSectionsComponent],
})
export class PageSectionsModule {}
