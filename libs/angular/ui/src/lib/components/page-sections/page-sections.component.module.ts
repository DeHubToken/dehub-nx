import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionDappPostsModule } from '@dehub/angular/ui/components/page-section-dapp-posts/page-section-dapp-posts.component.module';
import { PageSectionBasicPostsModule } from '../page-section-basic-posts';
import { PageSectionFaQsModule } from '../page-section-faqs';
import { PageSectionFeaturePostsModule } from '../page-section-feature-posts';
import { PageSectionIconTilesModule } from '../page-section-icon-tiles';
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
    PageSectionFaQsModule,
    PageSectionDappPostsModule,
  ],
  exports: [PageSectionsComponent],
})
export class PageSectionsModule {}
