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
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <div [@fadeInUp] class="grid">
      <div class="col-12 xl:col-8 col-offset-0 xl:col-offset-2">
        <!-- Back -->
        <p-button
          label="Back"
          icon="fas fa-long-arrow-left"
          [routerLink]="['/home']"
          styleClass="p-button-link p-button-lg mb-2"
        >
        </p-button>

        <!-- Basic Post Detail -->
        <dhb-basic-post-detail
          [basicPostDetail]="(basicPostDetail$ | async)!"
        ></dhb-basic-post-detail>
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
