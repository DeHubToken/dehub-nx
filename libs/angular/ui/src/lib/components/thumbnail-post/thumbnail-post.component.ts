import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ThumbnailPostFragment } from '@dehub/shared/model';
import { HeavyPictureComponent } from '../heavy-picture/heavy-picture.component';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';

@Component({
    selector: 'dhb-thumbnail-post',
    template: `
    <div [dhbContentfulDraft]="thumbnailPost.sys">
      <p-card *ngIf="thumbnailPost" styleClass="thumbnail p-card-shadow">
        <ng-template pTemplate="header">
          <ng-container *ngIf="thumbnailPost.link as link">
            <!-- Video Post -->
            <ng-container *ngIf="thumbnailPost.isVideo; else notVideo">
              <a href="#">
                <i class="fad fa-play-circle"></i>
                <dhb-heavy-picture
                  [container]="thumbnailPost"
                ></dhb-heavy-picture>
              </a>
            </ng-container>

            <!-- Other Post -->
            <ng-template #notVideo>
              <a [href]="link" target="_blank">
                <dhb-heavy-picture
                  [container]="thumbnailPost"
                ></dhb-heavy-picture>
              </a>
            </ng-template>
          </ng-container>
        </ng-template>
      </p-card>
    </div>
  `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ContentfulDraftDirective, NgIf, CardModule, SharedModule, HeavyPictureComponent]
})
export class ThumbnailPostComponent implements OnInit {
  @Input() thumbnailPost!: ThumbnailPostFragment;

  constructor() {}

  ngOnInit() {}
}
