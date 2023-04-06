import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { SectionPostModule } from '../section-post';
import { PageSectionSectionPostsComponent } from './page-section-section-posts.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    ContentfulDraftDirectiveModule,
    SectionPostModule,
    PageSectionSectionPostsComponent,
  ],
  exports: [PageSectionSectionPostsComponent],
})
export class PageSectionSectionPostsModule {}
