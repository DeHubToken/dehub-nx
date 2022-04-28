import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HeavyPictureModule } from '../../components//heavy-picture';
import { CanPlayDirectiveModule } from '../../directives/can-play';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ThumbnailPostComponent } from '../thumbnail-post/thumbnail-post.component';

@NgModule({
  declarations: [ThumbnailPostComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    CardModule,

    // Libs
    ContentfulDraftDirectiveModule,
    CanPlayDirectiveModule,
    HeavyPictureModule,
  ],
  exports: [ThumbnailPostComponent],
})
export class ThumbnailPostModule {}
