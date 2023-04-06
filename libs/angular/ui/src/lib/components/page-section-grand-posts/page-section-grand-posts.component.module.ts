import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { GrandPostModule } from '../grand-post';
import { PageSectionGrandPostsComponent } from '../page-section-grand-posts/page-section-grand-posts.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    ContentfulDraftDirectiveModule,
    GrandPostModule,
    PageSectionGrandPostsComponent,
  ],
  exports: [PageSectionGrandPostsComponent],
})
export class PageSectionGrandPostsModule {}
