import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ThumbnailPostFragment } from '@dehub/shared/model';
import { HeavyPictureComponent } from '../../heavy-picture/heavy-picture.component';

import { NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-thumbnail-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    // PrimeNG
    CardModule,
    // UI
    ContentfulDraftDirective,
    HeavyPictureComponent,
  ],
  template: `
    <div [dhbContentfulDraft]="thumbnailPost.sys">
      <p-card *ngIf="thumbnailPost" styleClass="thumbnail p-card-shadow">
        <ng-template pTemplate="header">
          <ng-container *ngIf="thumbnailPost.link as link">
            <!-- Video Post -->
            <ng-container *ngIf="thumbnailPost.isVideo; else notVideo">
              <a href="#">
                <i class="fad fa-play-circle"></i>
                <dhb-heavy-picture [container]="thumbnailPost" />
              </a>
            </ng-container>

            <!-- Other Post -->
            <ng-template #notVideo>
              <a [href]="link" target="_blank" rel="noreferrer">
                <dhb-heavy-picture [container]="thumbnailPost" />
              </a>
            </ng-template>
          </ng-container>
        </ng-template>
      </p-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailPostComponent implements OnInit {
  @Input() thumbnailPost!: ThumbnailPostFragment;

  constructor() {}

  ngOnInit() {}
}
