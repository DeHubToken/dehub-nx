import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageHomeCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { PageHomeFragment } from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <div class="grid">
      <div *ngIf="pageHome$ | async as pageHome" [@bounceInLeft] class="col-12">
        <h3>{{ pageHome.mainTitle }}</h3>
        <h4>{{ pageHome.subtitle }}</h4>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureHomeComponent implements OnInit {
  pageHome$?: Observable<PageHomeFragment | undefined>;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageHomeCollection: PageHomeCollectionService
  ) {}

  ngOnInit() {
    this.pageHome$ = this.pageHomeCollection
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageHomeCollection } }) =>
            pageHomeCollection?.items[0] ?? undefined
        )
      );
  }
}
