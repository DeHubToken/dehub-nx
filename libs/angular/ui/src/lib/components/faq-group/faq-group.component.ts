import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FaqGroupFragment, FaqItemFragment } from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';

@Component({
  selector: 'dhb-faq-group',
  template: `
    <div
      *ngIf="faqGroup"
      [dhbContentfulDraft]="faqGroup.sys"
      class="card border-round bg-gradient-2"
    >
      <h3>{{ faqGroup.name }}</h3>

      <!-- Faq Items -->
      <p-accordion>
        <ng-container *ngFor="let faqItem of faqItems; let i = index">
          <ng-container *ngIf="faqItem.question">
            <p-accordionTab [selected]="i === 0">
              <!-- Header -->
              <ng-template pTemplate="header">
                <div [dhbContentfulDraft]="faqItem.sys">
                  {{ faqItem.question }}
                </div>
              </ng-template>
              <!-- Content -->
              <ng-template pTemplate="content">
                <div [dhbContentfulDraft]="faqItem.sys">
                  {{ faqItem.answer }}
                </div>
              </ng-template>
            </p-accordionTab>
          </ng-container>
        </ng-container>
      </p-accordion>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqGroupComponent implements OnInit {
  @Input() faqGroup!: FaqGroupFragment;

  faqItems: FaqItemFragment[] = [];

  constructor() {}

  ngOnInit() {
    this.faqItems = (this.faqGroup.faqItemCollection?.items ?? []).filter(
      isNotNil
    );
  }
}
