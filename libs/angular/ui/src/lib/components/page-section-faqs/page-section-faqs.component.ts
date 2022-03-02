import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FaqGroupFragment, PageSectionFaQsFragment } from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-faqs',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 sm:col-12 md:col-12 xl:col-8 col-offset-0 sm:col-offset-0 md:col-offset-0 xl:col-offset-2"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Faq Groups -->
      <div class="grid">
        <div
          *ngFor="let faqGroup of faqGroups; let i = index"
          [@fadeInUp]="{ value: '', params: { delay: i * 100 } }"
          class="col-12"
        >
          <dhb-faq-group [faqGroup]="faqGroup"></dhb-faq-group>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionFaQsComponent implements OnInit {
  @Input() section!: PageSectionFaQsFragment;

  faqGroups: FaqGroupFragment[] = [];

  constructor() {}

  ngOnInit() {
    this.faqGroups = (
      this.section.handpickedFaqGroupsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
