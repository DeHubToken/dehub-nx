import { NgIf, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ContentfulDraftDirective } from '@dehub/angular/ui/directives/contentful-draft/contentful-draft.directive';
import { ContentfulImgAltPipe } from '@dehub/angular/ui/pipes/contentful-img-alt/contentful-img-alt.pipe';
import { ContentfulRichMarkupPipe } from '@dehub/angular/ui/pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { SafeHtmlPipe } from '@dehub/angular/ui/pipes/safe-html/safe-html.pipe';
import { BasicPostDetailFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-basic-post-detail',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    SafeHtmlPipe,
    NgOptimizedImage,
    // UI
    ContentfulDraftDirective,
    ContentfulRichMarkupPipe,
    ContentfulImgAltPipe,
  ],
  template: `
    <ng-container *ngIf="basicPostDetail">
      <div
        [dhbContentfulDraft]="basicPostDetail.sys"
        class="card image-card shadow-8 mx-4 bg-gradient-2 pb-5"
      >
        <!-- Main Picture -->
        <ng-container *ngIf="basicPostDetail.mainPicture as mainPicture">
          <img
            *ngIf="mainPicture.url"
            [dhbContentfulDraft]="mainPicture.sys"
            [ngSrc]="mainPicture.url"
            [width]="mainPicture.width"
            [height]="mainPicture.height"
            [alt]="mainPicture | dhbContentfulImgAlt"
            sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
            class="h-auto"
          />
        </ng-container>

        <div class="image-content px-4 xl:px-8">
          <!-- Title -->
          <h3>{{ basicPostDetail.title }}</h3>

          <!-- Description -->
          <div
            [innerHtml]="
              basicPostDetail.description?.json
                | dhbContentfulRichMarkup
                | dhbSafeHtml
            "
            class="line-height-3"
          ></div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPostDetailComponent implements OnInit {
  @Input() basicPostDetail?: BasicPostDetailFragment;

  constructor() {}

  ngOnInit() {}
}
