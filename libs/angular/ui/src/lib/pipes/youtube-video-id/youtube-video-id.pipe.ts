import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to get the youtube video id from the youtube url
 */
@Pipe({ name: 'dhbYoutubeVideoId', pure: true })
export class YoutubeVideoIdPipe implements PipeTransform {
  constructor() {}

  transform(youtubeUrl: string) {
    const videoId = youtubeUrl.split('v=')[1];
    return videoId;
  }
}
