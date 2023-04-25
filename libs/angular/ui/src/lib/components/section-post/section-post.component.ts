import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SectionPostFragment } from '@dehub/shared/model';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { ContentfulRichMarkupPipe } from '../../pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';
import { ChartPostComponent } from '../chart-post/chart-post.component';
import { EmbedPostComponent } from '../embed-post/embed-post.component';

@Component({
  selector: 'dhb-section-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    // UI
    ContentfulDraftDirective,
    ChartPostComponent,
    EmbedPostComponent,
    ContentfulRichMarkupPipe,
    SafeHtmlPipe,
  ],
  template: `
    <div
      *ngIf="sectionPost"
      [dhbContentfulDraft]="sectionPost.sys"
      class="px-0 md:px-0 lg:px-0 xl:px-3 pb-3"
    >
      <!-- Title -->
      <ng-container *ngIf="sectionPost.showTitle">
        <span
          *ngIf="sectionPost.titleSize as ts; else defaultTitle"
          [innerHtml]="resolveTitleSize(ts)"
        ></span>
        <ng-template #defaultTitle>
          <h5 class="pt-2 mb-0 uppercase text-sm">
            {{ sectionPost.title }}
          </h5>
        </ng-template>
        <hr class="mt-2" />
      </ng-container>

      <!-- Description -->
      <div
        [innerHtml]="
          sectionPost.richDescription?.json
            | dhbContentfulRichMarkup
            | dhbSafeHtml
        "
        class="line-height-3 pb-5"
      ></div>

      <dhb-chart-post
        *ngIf="sectionPost.chartPost as chartPost"
        [chartPost]="chartPost"
      ></dhb-chart-post>

      <dhb-embed-post
        *ngIf="sectionPost.embedPost as embedPost"
        [embedPost]="embedPost"
      >
      </dhb-embed-post>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPostComponent implements OnInit {
  @Input() sectionPost!: SectionPostFragment;

  constructor() {}

  ngOnInit() {}

  resolveTitleSize(ts: string) {
    return `<${ts} class="pt-2 mb-0">${this.sectionPost.title}</${ts}>`;
  }
}
