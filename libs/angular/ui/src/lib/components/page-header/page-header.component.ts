import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { resolveColumnWidth } from '@dehub/shared/util';
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
      <h1 *ngIf="page.showTitle" class="line-height-2">{{ page.mainTitle }}</h1>
      <h5
        *ngIf="page.showSubtitle"
        [ngClass]="{ 'xl:w-6': page.headerColumnWidth === 'full' }"
        class="mt-1 mb-7 line-height-4 font-light opacity-80"
      >
        {{ page.subtitle }}
      </h5>
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

  constructor() {}

  ngOnInit() {}

  resolveCol(page: P) {
    return resolveColumnWidth(page.headerColumnWidth, page.headerAlignCenter);
  }
}
