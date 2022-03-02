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
      <h5 class="pt-2 mb-0 uppercase text-sm">{{ sectionPost.title }}</h5>
      <hr class="mt-2" />

      <!-- Description -->
      <div
        [innerHtml]="getRichMarkup(sectionPost) | dhbSafeHtml"
        class="line-height-3"
      ></div>
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
}
