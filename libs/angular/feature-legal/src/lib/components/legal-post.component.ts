import { DatePipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ContentfulDraftDirective } from '@dehub/angular/ui/directives/contentful-draft/contentful-draft.directive';
import { ContentfulRichMarkupPipe } from '@dehub/angular/ui/pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { SafeHtmlPipe } from '@dehub/angular/ui/pipes/safe-html/safe-html.pipe';
import { LegalPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-legal-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    DatePipe,
    SafeHtmlPipe,
    // UI
    ContentfulDraftDirective,
    ContentfulRichMarkupPipe,
  ],
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
            Last updated: {{ legalPost.sys.publishedAt | date : 'fullDate' }}
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
