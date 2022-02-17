import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BasicPostCollectionBySlugService,
  EnvToken,
} from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { BasicPostDetailFragment } from '@dehub/shared/model';
import { bounceInRightOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <div [@bounceInRight] class="grid">
      <!-- Back -->
      <p-button
        label="Back"
        [routerLink]="['/home']"
        styleClass="p-button-link p-mr-2"
      ></p-button>

      <!-- Basic Post Detail -->
      <dhb-basic-post-detail
        [basicPostDetail]="(basicPostDetail$ | async)!"
      ></dhb-basic-post-detail>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' })],
})
export class AngularFeatureNewsDetailComponent implements OnInit {
  basicPostDetail$!: Observable<BasicPostDetailFragment | undefined>;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private route: ActivatedRoute,
    private basicPostDetailsBySlugService: BasicPostCollectionBySlugService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? undefined;

    this.basicPostDetail$ = this.basicPostDetailsBySlugService
      .fetch({
        slug,
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { basicPostCollection } }) =>
            basicPostCollection?.items[0] ?? undefined
        )
      );
  }
}
