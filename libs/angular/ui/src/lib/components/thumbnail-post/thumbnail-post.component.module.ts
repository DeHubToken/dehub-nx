import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HeavyPictureComponent } from '../../components//heavy-picture';
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
    HeavyPictureComponent,
  ],
  exports: [ThumbnailPostComponent],
})
export class ThumbnailPostModule {}
