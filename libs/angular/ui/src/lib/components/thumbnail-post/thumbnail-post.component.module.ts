import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ComingSoonDirectiveModule } from '../../directives/coming-soon';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ThumbnailPostComponent } from '../thumbnail-post/thumbnail-post.component';

@NgModule({
  declarations: [ThumbnailPostComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    CardModule,

    // Libs
    ContentfulDraftDirectiveModule,
    ComingSoonDirectiveModule,
  ],
  exports: [ThumbnailPostComponent],
})
export class ThumbnailPostModule {}
