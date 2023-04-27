import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LegalPostCollectionBySlugService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { BackButtonComponent } from '@dehub/angular/ui/components/buttons/back-button/back-button.component';
import {
  LegalPostFragment,
  NavigationTabMenu,
  SharedEnv,
  animationDuration,
} from '@dehub/shared/model';
import { filterNil } from '@dehub/shared/utils';
import { PushModule } from '@rx-angular/template/push';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Observable, map, switchMap } from 'rxjs';
import { LegalPostComponent } from './components/legal-post.component';

@Component({
  standalone: true,
  imports: [
    // Angular
    RouterLink,
    // UI
    BackButtonComponent,
    LegalPostComponent,
    // 3rd Party
    PushModule,
  ],
  template: `
    <div [@fadeInUp] class="grid">
      <div class="col-12 xl:col-8 col-offset-0 xl:col-offset-2">
        <!-- Back (top) -->
        <dhb-back-button [routerLink]="routerLink"></dhb-back-button>

        <!-- Legal Post -->
        <dhb-legal-post [legalPost]="legalPost$ | push"></dhb-legal-post>

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
export class AngularFeatureLegalComponent implements OnInit {
  legalPost$!: Observable<LegalPostFragment | undefined>;

  routerLink = [`/${NavigationTabMenu.Home}`];

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private route: ActivatedRoute,
    private legalPostBySlugService: LegalPostCollectionBySlugService
  ) {}

  ngOnInit() {
    this.legalPost$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('slug')),
      filterNil(),
      switchMap(slug =>
        this.legalPostBySlugService
          .fetch({
            slug,
            isPreview: this.env.contentful.isPreview,
          })
          .pipe(
            map(
              ({ data: { legalPostCollection } }) =>
                legalPostCollection?.items[0] ?? undefined
            )
          )
      )
    );
  }
}
