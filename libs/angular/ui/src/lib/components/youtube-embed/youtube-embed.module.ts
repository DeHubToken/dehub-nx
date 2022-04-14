import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeVideoIdPipeModule } from '../../pipes/youtube-video-id/youtube-video-id.pipe.module';
import { YoutubeEmbedComponent } from './youtube-embed.component';

@NgModule({
  declarations: [YoutubeEmbedComponent],
  imports: [
    // Angular
    CommonModule,
    YouTubePlayerModule,

    // Libs
    YoutubeVideoIdPipeModule,
  ],
  exports: [YoutubeEmbedComponent],
})
export class YoutubeEmbedModule {}
