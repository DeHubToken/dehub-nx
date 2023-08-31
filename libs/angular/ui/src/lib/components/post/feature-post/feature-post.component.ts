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
import { HeavyPictureComponent } from '../../heavy-picture/heavy-picture.component';
import { YoutubeEmbedComponent } from '../../youtube-embed/youtube-embed.component';

import { DatePipe, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-feature-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    DatePipe,
    // PrimeNG
    CardModule,
    // UI
    ButtonModule,
    HeavyPictureComponent,
    ContentfulDraftDirective,
  ],
  template: `
    <div [dhbContentfulDraft]="featurePost.sys">
      <p-card
        *ngIf="featurePost"
        [header]="featurePost.title ?? ''"
        [subheader]="(featurePost.sys.firstPublishedAt | date : 'fullDate')!"
        styleClass="feature p-card-shadow h-full"
      >
        <ng-template pTemplate="header">
          <div class="picture-frame" [class.wide]="numOfVisibleImages === 1">
            <i
              *ngIf="featurePost.videoUrl"
              class="fad fa-play-circle"
              (click)="onVideoPlayClicked()"
            ></i>
            <dhb-heavy-picture
              [container]="featurePost"
              [autoHeight]="false"
              [numOfVisibleImages]="numOfVisibleImages"
              [priority]="priorityImage"
            />
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
          />
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

      .picture-frame {
        height: 15rem !important;
      }
      @media screen and (min-width: 450px) {
        .picture-frame {
          height: 36rem !important;
        }
      }
      @media screen and (min-width: 992px) {
        .picture-frame {
          height: 20rem !important;
        }
      }
      @media screen and (min-width: 1250px) {
        .picture-frame {
          height: 26rem !important;
        }
      }
      @media screen and (min-width: 1350px) {
        .picture-frame.wide {
          height: 40rem !important;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturePostComponent implements OnInit {
  @Input() featurePost!: FeaturePostFragment;
  @Input() priorityImage = false;
  @Input() numOfVisibleImages = 1;

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
