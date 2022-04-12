import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { CallToAction } from '@dehub/shared/model';
import { resolveButtonStyle, resolveColumnWidth } from '@dehub/shared/utils';
import { WINDOW } from '@ng-web-apis/common';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

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
          'mb-7': !ctas
        }"
        class="mt-1 line-height-4 font-light opacity-80"
      >
        {{ page.subtitle }}
      </h5>

      <div *ngIf="ctas" class="mb-7">
        <p-button
          *ngFor="let cta of ctas"
          pRipple
          [dhbContentfulDraft]="cta.sys"
          [label]="cta?.label || ''"
          [icon]="cta?.icon || ''"
          [routerLink]="cta?.routerLink || undefined"
          [styleClass]="resolveButton(cta?.type, cta?.style, cta?.size)"
          (onClick)="onButtonClicked($event, cta.externalLink)"
        >
        </p-button>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageHeaderComponent<
  P extends {
    mainTitle?: string;
    showTitle?: boolean;
    subtitle?: string;
    showSubtitle?: boolean;
    headerColumnWidth?: string;
    headerAlignCenter?: boolean;
  }
> implements OnInit
{
  @Input() page?: P;
  @Input() ctas?: CallToAction[];

  constructor(@Inject(WINDOW) private readonly windowRef: Window) {}

  ngOnInit() {}

  resolveCol(page: P) {
    return resolveColumnWidth(page.headerColumnWidth, page.headerAlignCenter);
  }

  resolveButton(type?: string, style?: string, size?: string) {
    return resolveButtonStyle(type, style, size) + ' mb-3';
  }

  onButtonClicked(event: Event, link?: string) {
    event.preventDefault();
    if (link) {
      this.windowRef.open(link, '_blank', 'noopener,noreferrer');
    }
  }
}
