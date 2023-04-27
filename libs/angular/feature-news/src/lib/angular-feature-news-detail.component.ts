import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BasicPostCollectionBySlugService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { BackButtonComponent } from '@dehub/angular/ui/components/buttons/back-button/back-button.component';
import {
  BasicPostDetailFragment,
  NavigationTabMenu,
  SharedEnv,
  animationDuration,
} from '@dehub/shared/model';
import { PushModule } from '@rx-angular/template/push';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Observable, map } from 'rxjs';
import { BasicPostDetailComponent } from './components/basic-post-detail.component';
@Component({
  standalone: true,
  imports: [
    // Angular
    RouterLink,
    // UI
    BackButtonComponent,
    BasicPostDetailComponent,
    // 3rd Party
    PushModule,
  ],
  template: `
    <div [@fadeInUp] class="grid">
      <div
        class="col-12 lg:col-12 xl:col-6 col-offset-0 lg:col-offset-0 xl:col-offset-3"
      >
        <!-- Back (top) -->
        <dhb-back-button [routerLink]="routerLink"></dhb-back-button>

        <!-- Basic Post Detail -->
        <dhb-basic-post-detail
          [basicPostDetail]="basicPostDetail$ | push"
        ></dhb-basic-post-detail>

        <!-- Back (bottom) -->
        <dhb-back-button [routerLink]="routerLink"></dhb-back-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'fadeInUp',
      duration: animationDuration,
    }),
  ],
})
export class AngularFeatureNewsDetailComponent implements OnInit {
  basicPostDetail$!: Observable<BasicPostDetailFragment | undefined>;

  routerLink = [`/${NavigationTabMenu.Home}`];

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
