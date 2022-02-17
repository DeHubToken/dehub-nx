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
    <div class="grid">
      <div *ngIf="section">
        <h3 [@bounceInRight] class="col-12">{{ section.title }}</h3>

        <!-- Faq Groups -->
        <div class="grid">
          <div
            *ngFor="let faqGroup of faqGroups; let i = index"
            [@bounceInUp]="{ value: '', params: { delay: i * 100 } }"
          >
            <dhb-page-section-faq-group
              [faqGroup]="faqGroup"
            ></dhb-page-section-faq-group>
          </div>
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
