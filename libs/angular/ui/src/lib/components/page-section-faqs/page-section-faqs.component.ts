import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FaqGroupFragment, PageSectionFaQsFragment } from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import {
  bounceInRightOnEnterAnimation,
  bounceInUpOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'dhb-page-section-faqs',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@bounceInRight]
      class="col-12"
    >
      <h3>{{ section.title }}</h3>

      <!-- Faq Groups -->
      <div class="grid">
        <div
          *ngFor="let faqGroup of faqGroups; let i = index"
          [@bounceInUp]="{ value: '', params: { delay: i * 100 } }"
          class="col-12 md:col-6"
        >
          <dhb-faq-group [faqGroup]="faqGroup"></dhb-faq-group>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' }),
    bounceInUpOnEnterAnimation({ anchor: 'bounceInUp' }),
  ],
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
