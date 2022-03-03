import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { LegalPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-legal-post',
  template: `
    <ng-container *ngIf="legalPost">
      <div
        [dhbContentfulDraft]="legalPost.sys"
        class="card image-card shadow-8 mx-4 bg-gradient-2 pb-5"
      >
        <div class="image-content">
          <!-- Title -->
          <h3>{{ legalPost.title }}</h3>

          <!-- Date -->
          <p>
            Last updated: {{ legalPost.sys.publishedAt | date: 'fullDate' }}
          </p>

          <!-- Description -->
          <div
            [innerHtml]="
              legalPost.description?.json
                | dhbContentfulRichMarkup
                | dhbSafeHtml
            "
            class="line-height-3"
          ></div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPostComponent implements OnInit {
  @Input() legalPost?: LegalPostFragment;

  constructor() {}

  ngOnInit() {}
}
