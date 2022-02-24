import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionBasicPostsModule } from '../page-section-basic-posts';
import { PageSectionFaQsModule } from '../page-section-faqs';
import { PageSectionFeaturePostsModule } from '../page-section-feature-posts';
import { PageSectionIconTilesModule } from '../page-section-icon-tiles';
import { PageSectionsComponent } from './page-sections.component';

@NgModule({
  declarations: [PageSectionsComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    PageSectionFeaturePostsModule,
    PageSectionBasicPostsModule,
    PageSectionIconTilesModule,
    PageSectionFaQsModule,
  ],
  exports: [PageSectionsComponent],
})
export class PageSectionsModule {}
