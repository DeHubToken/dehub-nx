import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PageEarnFragment,
  PageGameFragment,
  PageHomeFragment,
  PageLearnFragment,
  PageStreamFragment,
} from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-header',
  template: `
    <div
      *ngIf="page"
      [@bounceInLeft]
      [ngClass]="{ 'py-7': !page.showTitle && !page.showSubtitle }"
      class="col-12"
    >
      <h1 *ngIf="page.showTitle">{{ page.mainTitle }}</h1>
      <h5 *ngIf="page.showSubtitle" class="mt-1 xl:w-6 mb-7">
        {{ page.subtitle }}
      </h5>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class PageHeaderComponent implements OnInit {
  @Input() page?:
    | PageHomeFragment
    | PageStreamFragment
    | PageGameFragment
    | PageLearnFragment
    | PageEarnFragment;

  constructor() {}

  ngOnInit() {}
}
