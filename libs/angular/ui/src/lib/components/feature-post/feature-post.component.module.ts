import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeavyPictureComponent } from '../../components/heavy-picture';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '../../pipes/youtube-video-id';
import { YoutubeEmbedModule } from '../youtube-embed';
import { FeaturePostComponent } from './feature-post.component';

@NgModule({
  declarations: [FeaturePostComponent],
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
    HeavyPictureComponent,
  ],
  exports: [FeaturePostComponent],
})
export class FeaturePostModule {}
