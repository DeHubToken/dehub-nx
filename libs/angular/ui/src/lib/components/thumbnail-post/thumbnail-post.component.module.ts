import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HeavyPictureModule } from '../../components//heavy-picture';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ThumbnailPostComponent } from '../thumbnail-post/thumbnail-post.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // PrimeNg
    CardModule,
    // Libs
    ContentfulDraftDirectiveModule,
    HeavyPictureModule,
    ThumbnailPostComponent,
  ],
  exports: [ThumbnailPostComponent],
})
export class ThumbnailPostModule {}
