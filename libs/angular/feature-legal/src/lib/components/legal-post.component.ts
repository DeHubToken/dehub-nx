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
import { LegalPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-legal-post',
  template: `
    <ng-container *ngIf="legalPost">
      <div
        [dhbContentfulDraft]="legalPost.sys"
        class="card image-card shadow-8 mx-4 bg-gradient-2 pb-5"
      >
        <div class="image-content">
          <!-- Title -->
          <h3>{{ legalPost.title }}</h3>

          <!-- Date -->
          <p>
            Last updated: {{ legalPost.sys.publishedAt | date: 'fullDate' }}
          </p>

          <!-- Description -->
          <div
            [innerHtml]="getRichMarkup(legalPost) | dhbSafeHtml"
            class="line-height-3"
          ></div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPostComponent implements OnInit {
  @Input() legalPost?: LegalPostFragment;

  constructor() {}

  ngOnInit() {}

  /** TODO: this can be a util */
  getRichMarkup({ description }: LegalPostFragment) {
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
