import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeEmbedComponent } from '@dehub/angular/ui/components/youtube-embed/youtube-embed.component';
import { YoutubeVideoIdPipeModule } from '@dehub/angular/ui/pipes/youtube-video-id';

@NgModule({
  declarations: [YoutubeEmbedComponent],
  imports: [
    // Angular
    CommonModule,
    YouTubePlayerModule,

    // Lib Modules
    YoutubeVideoIdPipeModule,
  ],
  exports: [YoutubeEmbedComponent],
})
export class YoutubeEmbedModule {}
