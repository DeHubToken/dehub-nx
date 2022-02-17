import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FaqGroupFragment, FaqItemFragment } from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';

@Component({
  selector: 'dhb-page-section-faq-group',
  template: `
    <ng-container *ngIf="faqGroup">
      <div [dhbContentfulDraft]="faqGroup.sys" class="card">
        <h3>{{ faqGroup.name }}</h3>

        <!-- Faq Items -->
        <p-accordion>
          <ng-container *ngFor="let faqItem of faqItems; let i = index">
            <ng-container *ngIf="faqItem.question">
              <p-accordionTab [header]="faqItem.question" [selected]="i === 0">
                {{ faqItem.answer }}
              </p-accordionTab>
            </ng-container>
          </ng-container>
        </p-accordion>
      </div>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionFaqGroupComponent implements OnInit {
  @Input() faqGroup!: FaqGroupFragment;

  faqItems: FaqItemFragment[] = [];

  constructor() {}

  ngOnInit() {
    this.faqItems = (this.faqGroup.faqItemCollection?.items ?? []).filter(
      isNotNil
    );
  }
}
