import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { BasicPostDetailFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-basic-post-detail',
  template: `
    <ng-container *ngIf="basicPostDetail">
      <div
        [dhbContentfulDraft]="basicPostDetail.sys"
        class="card image-card shadow-8 mx-4 bg-gradient-2 pb-5"
      >
        <!-- Main Picture -->
        <ng-container *ngIf="basicPostDetail.mainPicture as mainPicture">
          <img
            [dhbContentfulDraft]="mainPicture.sys"
            [src]="mainPicture.url"
            [alt]="mainPicture.title"
          />
        </ng-container>

        <div class="image-content">
          <!-- Title -->
          <h3>{{ basicPostDetail.title }}</h3>

          <!-- Date -->
          <p>
            {{
              basicPostDetail.sys.publishedAt
                | date: 'EEE, MMM d, y, hh:mm:ss zzzz'
            }}
          </p>

          <!-- Description -->
          <div
            [innerHtml]="getRichMarkup(basicPostDetail) | dhbSafeHtml"
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

  /** TODO: this can be a util */
  getRichMarkup({ description }: BasicPostDetailFragment) {
    const richOptions: Options = {
      renderNode: {
        [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
        [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
        [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      },
    };
    return documentToHtmlString(description?.json, richOptions);
  }
}
