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
import { SectionPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-section-post',
  template: `
    <div
      *ngIf="sectionPost"
      [dhbContentfulDraft]="sectionPost.sys"
      class="px-5 pb-3"
    >
      <!-- Title -->
      <ng-container *ngIf="sectionPost.showTitle">
        <h5 class="pt-2 mb-0 uppercase text-sm">{{ sectionPost.title }}</h5>
        <hr class="mt-2" />
      </ng-container>

      <!-- Description -->
      <div
        [innerHtml]="getRichMarkup(sectionPost) | dhbSafeHtml"
        class="line-height-3"
      ></div>

      <dhb-chart-post
        *ngIf="hasChart()"
        [chartPost]="sectionPost.chartCollection!.items[0]!"
      ></dhb-chart-post>

      <dhb-embed-post
        *ngIf="hasEmbed()"
        [embedPost]="sectionPost.embedCollection!.items[0]!"
      >
      </dhb-embed-post>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPostComponent implements OnInit {
  @Input() sectionPost!: SectionPostFragment;

  constructor() {}

  ngOnInit() {}

  /** TODO: this can be a util */
  getRichMarkup({ richDescription }: SectionPostFragment) {
    const richOptions: Options = {
      renderNode: {
        [BLOCKS.UL_LIST]: (node, next) =>
          `<ul class="pl-4 mb-0">${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) =>
          `<ol class="pl-3 mb-0">${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node, next) =>
          `<li class="pb-2">${next(node.content)}</li>`,
      },
    };
    return documentToHtmlString(richDescription?.json, richOptions);
  }

  hasChart() {
    return (
      this.sectionPost.chartCollection &&
      this.sectionPost.chartCollection.items.length > 0
    );
  }

  hasEmbed() {
    return (
      this.sectionPost.embedCollection &&
      this.sectionPost.embedCollection.items.length > 0
    );
  }
}
