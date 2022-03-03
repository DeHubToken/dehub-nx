import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SectionPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-section-post',
  template: `
    <div
      *ngIf="sectionPost"
      [dhbContentfulDraft]="sectionPost.sys"
      class="px-0 md:px-0 lg:px-0 xl:px-3 pb-3"
    >
      <!-- Title -->
      <ng-container *ngIf="sectionPost.showTitle">
        <h5 class="pt-2 mb-0 uppercase text-sm">{{ sectionPost.title }}</h5>
        <hr class="mt-2" />
      </ng-container>

      <!-- Description -->
      <div
        [innerHtml]="
          sectionPost.richDescription?.json
            | dhbContentfulRichMarkup
            | dhbSafeHtml
        "
        class="line-height-3"
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
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPostComponent implements OnInit {
  @Input() sectionPost!: SectionPostFragment;

  constructor() {}

  ngOnInit() {}
}
