import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicPostCollectionBySlugService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { BasicPostDetailFragment, SharedEnv } from '@dehub/shared/model';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { map, Observable } from 'rxjs';
@Component({
  template: `
    <div [@fadeInUp] class="grid">
      <div
        class="col-12 lg:col-12 xl:col-6 col-offset-0 lg:col-offset-0 xl:col-offset-3"
      >
        <!-- Back (top) -->
        <dhb-back-button [routerLink]="['/home']"></dhb-back-button>

        <!-- Basic Post Detail -->
        <dhb-basic-post-detail
          [basicPostDetail]="basicPostDetail$ | push"
        ></dhb-basic-post-detail>

        <!-- Back (bottom) -->
        <dhb-back-button [routerLink]="['/home']"></dhb-back-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 300 })],
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
