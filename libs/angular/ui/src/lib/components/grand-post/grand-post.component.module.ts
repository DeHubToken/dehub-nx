import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '../../pipes/youtube-video-id';
import { GrandPostComponent } from '../grand-post/grand-post.component';
import { YoutubeEmbedModule } from '../youtube-embed';

@NgModule({
  declarations: [GrandPostComponent],
  imports: [
    // Angular
    CommonModule,

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
