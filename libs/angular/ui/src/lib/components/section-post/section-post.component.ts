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
      class="px-5 pb-3"
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
        *ngIf="hasChart()"
        [chartPost]="sectionPost.chartCollection!.items[0]!"
      ></dhb-chart-post>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPostComponent implements OnInit {
  @Input() sectionPost!: SectionPostFragment;

  constructor() {}

  ngOnInit() {}

  hasChart() {
    return (
      this.sectionPost.chartCollection &&
      this.sectionPost.chartCollection.items.length > 0
    );
  }
}
