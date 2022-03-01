import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GrandPostComponent } from '@dehub/angular/ui/components/grand-post/grand-post.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '../../pipes/youtube-video-id';
import { YoutubeEmbedModule } from '../youtube-embed';

@NgModule({
  declarations: [GrandPostComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    ButtonModule,
    CardModule,

    // Libs
    ContentfulDraftDirectiveModule,
    YoutubeEmbedModule,
    YoutubeVideoIdPipeModule,
  ],
  exports: [GrandPostComponent],
})
export class GrandPostModule {}
