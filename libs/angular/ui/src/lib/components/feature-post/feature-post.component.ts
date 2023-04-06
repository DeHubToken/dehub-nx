import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FeaturePostFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { HeavyPictureComponent } from '../heavy-picture/heavy-picture.component';
import { YoutubeEmbedComponent } from '../youtube-embed';

import { DatePipe, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-feature-post',
  template: `
    <div [dhbContentfulDraft]="featurePost.sys">
      <p-card
        *ngIf="featurePost"
        [header]="featurePost.title ?? ''"
        [subheader]="(featurePost.sys.firstPublishedAt | date: 'fullDate')!"
        styleClass="feature p-card-shadow h-full"
      >
        <ng-template pTemplate="header">
          <div class="picture-frame">
            <i
              *ngIf="featurePost.videoUrl"
              class="fad fa-play-circle"
              (click)="onVideoPlayClicked()"
            ></i>
            <dhb-heavy-picture [container]="featurePost"></dhb-heavy-picture>
          </div>
        </ng-template>

        <!-- Description -->
        <p>{{ featurePost.description }}</p>

        <ng-template
          *ngIf="
            featurePost.callToActionButtonLabel && featurePost.callToActionUrl
          "
          pTemplate="footer"
        >
          <p-button
            [label]="featurePost.callToActionButtonLabel"
            (onClick)="onCTAClicked($event)"
            styleClass="p-button-primary p-button-lg p-button-raised"
          ></p-button>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      /* Important for keeping all items stretched to same height */
      :host {
        height: 100%;
        & > div {
          height: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ContentfulDraftDirective,
    NgIf,
    CardModule,
    HeavyPictureComponent,
    ButtonModule,
    DatePipe,
  ],
})
export class FeaturePostComponent implements OnInit {
  @Input() featurePost!: FeaturePostFragment;

  constructor(
    @Inject(WINDOW) private readonly windowRef: Window,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  onVideoPlayClicked() {
    if (this.featurePost.videoUrl) {
      this.dialogService.open(YoutubeEmbedComponent, {
        data: {
          videoUrl: this.featurePost.videoUrl,
        },
        showHeader: true,
        header: this.featurePost.title,
        width: '80%',
        styleClass: 'bg-gradient-2',
        closeOnEscape: true,
        dismissableMask: true,
      });
    }
  }

  onCTAClicked(event: Event) {
    event.preventDefault();
    if (this.featurePost.callToActionUrl) {
      this.windowRef.open(
        this.featurePost.callToActionUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }
}
