import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { PersonPostModule } from '../person-post';
import { PageSectionPersonPostsComponent } from './page-section-person-posts.component';

@NgModule({
  declarations: [PageSectionPersonPostsComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    PersonPostModule,
  ],
  exports: [PageSectionPersonPostsComponent],
})
export class PageSectionPersonPostsModule {}
