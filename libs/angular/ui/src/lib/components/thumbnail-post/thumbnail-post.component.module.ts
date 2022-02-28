import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThumbnailPostComponent } from '@dehub/angular/ui/components/thumbnail-post/thumbnail-post.component';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';

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
  ],
  exports: [ThumbnailPostComponent],
})
export class ThumbnailPostModule {}
