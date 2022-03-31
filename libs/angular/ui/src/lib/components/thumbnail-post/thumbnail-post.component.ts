import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ThumbnailPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-thumbnail-post',
  template: `
    <div [dhbContentfulDraft]="thumbnailPost.sys">
      <p-card *ngIf="thumbnailPost" styleClass="thumbnail p-card-shadow">
        <ng-template pTemplate="header">
          <ng-container *ngIf="thumbnailPost.link as link">
            <!-- Video Post -->
            <ng-container *ngIf="thumbnailPost.isVideo; else notVideo">
              <a href="#" [dhbCanPlay]="link">
                <i class="fad fa-play-circle"></i>
                <img
                  *ngIf="thumbnailPost.picture as picture"
                  [dhbContentfulDraft]="picture.sys"
                  class="block"
                  [src]="picture.url"
                  [alt]="picture.title"
                />
              </a>
            </ng-container>

            <!-- Other Post -->
            <ng-template #notVideo>
              <a [href]="link" target="_blank">
                <img
                  *ngIf="thumbnailPost.picture as picture"
                  [dhbContentfulDraft]="picture.sys"
                  class="block"
                  [src]="picture.url"
                  [alt]="picture.title"
                />
              </a>
            </ng-template>
          </ng-container>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailPostComponent implements OnInit {
  @Input() thumbnailPost!: ThumbnailPostFragment;

  constructor() {}

  ngOnInit() {}
}
