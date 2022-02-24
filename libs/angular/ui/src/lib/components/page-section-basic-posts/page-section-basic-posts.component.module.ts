import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { BasicPostComponentModule } from '../basic-post';
import { PageSectionBasicPostsComponent } from './page-section-basic-posts.component';

@NgModule({
  declarations: [PageSectionBasicPostsComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    CardModule,
    CarouselModule,

    // Libs
    ContentfulDraftDirectiveModule,
    BasicPostComponentModule,
  ],
  exports: [PageSectionBasicPostsComponent],
})
export class PageSectionBasicPostsComponentModule {}
