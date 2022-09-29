import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegalPostCollectionBySlugService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { LegalPostFragment } from '@dehub/shared/model';
import { filterNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  template: `
    <div [@fadeInUp] class="grid">
      <div class="col-12 xl:col-8 col-offset-0 xl:col-offset-2">
        <!-- Back (top) -->
        <dhb-back-button [routerLink]="['/home']"></dhb-back-button>

        <!-- Legal Post -->
        <dhb-legal-post [legalPost]="legalPost$ | push"></dhb-legal-post>

        <!-- Back (bottom) -->
        <dhb-back-button [routerLink]="['/home']"></dhb-back-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 300 })],
})
export class AngularFeatureLegalComponent implements OnInit {
  legalPost$!: Observable<LegalPostFragment | undefined>;

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
