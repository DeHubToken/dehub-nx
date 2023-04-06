import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YoutubeVideoIdPipe } from './youtube-video-id.pipe';

@NgModule({
  imports: [CommonModule, YoutubeVideoIdPipe],
  exports: [YoutubeVideoIdPipe],
})
export class YoutubeVideoIdPipeModule {}
