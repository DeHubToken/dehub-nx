import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FeaturePostFragment } from '@dehub/shared/model';

let youtubeApiLoaded = false;
@Component({
  selector: 'dhb-page-section-feature-post',
  template: `
    <ng-container *ngIf="featurePost">
      <div [dhbContentfulDraft]="featurePost.sys" class="card image-card mx-4">
        <!-- Video Url -->
        <youtube-player
          *ngIf="featurePost.videoUrl as videoUrl; else showPicture"
          [videoId]="videoUrl | dhbYoutubeVideoId"
        ></youtube-player>

        <!-- Picture -->
        <ng-template #showPicture>
          <ng-container *ngIf="featurePost.picture as picture">
            <img
              [dhbContentfulDraft]="picture.sys"
              [src]="picture.url"
              [alt]="picture.title"
            />
          </ng-container>
        </ng-template>

        <div class="image-content">
          <!-- Title -->
          <h3>{{ featurePost.title }}</h3>

          <!-- Date -->
          <p>
            {{
              featurePost.sys.publishedAt | date: 'EEE, MMM d, y, hh:mm:ss zzzz'
            }}
          </p>

          <!-- Description -->
          <p>{{ featurePost.description }}</p>

          <!-- Call To Action -->
          <a
            *ngIf="
              featurePost.callToActionButtonLabel && featurePost.callToActionUrl
            "
            [href]="featurePost.callToActionUrl"
            target="_blank"
            styleClass="p-button-link p-mr-2"
            >{{ featurePost.callToActionButtonLabel }}</a
          >
        </div>
      </div>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionFeaturePostComponent implements OnInit {
  @Input() featurePost!: FeaturePostFragment;

  constructor() {}

  ngOnInit() {
    if (!youtubeApiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      youtubeApiLoaded = true;
    }
  }
}
