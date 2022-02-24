import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '../../pipes/youtube-video-id';
import { YoutubeEmbedModule } from '../youtube-embed';
import { FeaturePostComponent } from './feature-post.component';

@NgModule({
  declarations: [FeaturePostComponent],
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
  exports: [FeaturePostComponent],
})
export class FeaturePostModule {}
