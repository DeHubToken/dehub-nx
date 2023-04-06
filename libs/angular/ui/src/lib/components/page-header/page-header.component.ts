import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallToActionFragment } from '@dehub/shared/model';
import { resolveButtonStyle, resolveColumnWidth } from '@dehub/shared/utils';
import { WINDOW } from '@ng-web-apis/common';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { ButtonModule } from 'primeng/button';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-page-header',
  template: `
    <div
      *ngIf="page"
      [@fadeInUp]
      [ngClass]="{ 'py-0': !page.showTitle && !page.showSubtitle }"
      [class]="resolveCol(page)"
    >
      <h1 *ngIf="page.showTitle" class="line-height-3">{{ page.mainTitle }}</h1>
      <h5
        *ngIf="page.showSubtitle"
        [ngClass]="{
          'xl:w-6': page.headerColumnWidth === 'full',
          'mb-7': !page.ctasCollection?.items
        }"
        class="mt-1 line-height-4 font-light opacity-80"
      >
        {{ page.subtitle }}
      </h5>

      <div *ngIf="page.ctasCollection?.items as ctas" class="mb-7">
        <ng-container *ngFor="let cta of ctas">
          <p-button
            *ngIf="cta"
            [dhbContentfulDraft]="cta.sys"
            [label]="cta?.label || ''"
            [icon]="cta?.icon || ''"
            [routerLink]="cta?.routerLink || undefined"
            [styleClass]="resolveButton(cta?.type, cta?.style, cta?.size)"
            (onClick)="onButtonClicked($event, cta.externalLink)"
          >
          </p-button>
        </ng-container>
      </div>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgFor,
    ButtonModule,
    ContentfulDraftDirective,
    RouterLink,
  ],
})
export class PageHeaderComponent<
  P extends {
    mainTitle?: string;
    showTitle?: boolean;
    subtitle?: string;
    showSubtitle?: boolean;
    headerColumnWidth?: string;
    headerAlignCenter?: boolean;
    ctasCollection?: {
      __typename?: string;
      items: Array<CallToActionFragment | undefined>;
    };
  }
> implements OnInit
{
  @Input() page?: P;

  constructor(@Inject(WINDOW) private readonly windowRef: Window) {}

  ngOnInit() {}

  resolveCol(page: P) {
    return resolveColumnWidth(page.headerColumnWidth, page.headerAlignCenter);
  }

  resolveButton(type?: string, style?: string, size?: string) {
    return resolveButtonStyle(type, style, size) + ' mb-3 mr-3';
  }

  onButtonClicked(event: Event, link?: string) {
    event.preventDefault();
    if (link) {
      this.windowRef.open(link, '_blank', 'noopener,noreferrer');
    }
  }
}
