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
import { filterEmpty } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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

        <!-- Legal Post -->
        <dhb-legal-post [legalPost]="(legalPost$ | async)!"></dhb-legal-post>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 300 })],
})
export class AngularFeatureLegalDetailComponent implements OnInit {
  legalPost$!: Observable<LegalPostFragment | undefined>;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private route: ActivatedRoute,
    private legalPostBySlugService: LegalPostCollectionBySlugService
  ) {}

  ngOnInit() {
    this.legalPost$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('slug')),
      filterEmpty(),
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
