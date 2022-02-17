import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
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
    <div class="grid">
      <p-button
        label="Back"
        [routerLink]="['/home']"
        styleClass="p-button-link p-mr-2"
      ></p-button>

      <ng-container *ngIf="basicPostDetail$ | async as basicPostDetail">
        <div
          [dhbContentfulDraft]="basicPostDetail.sys"
          class="card image-card shadow-8 mx-4"
        >
          <!-- Main Picture -->
          <ng-container *ngIf="basicPostDetail.mainPicture as mainPicture">
            <img [src]="mainPicture.url" [alt]="mainPicture.title" />
          </ng-container>

          <div class="image-content">
            <!-- Title -->
            <h3>{{ basicPostDetail.title }}</h3>

            <!-- Date -->
            <p>
              {{
                basicPostDetail.sys.publishedAt
                  | date: 'EEE, MMM d, y, hh:mm:ss zzzz'
              }}
            </p>

            <!-- Description -->
            <div
              [innerHtml]="getRichMarkup(basicPostDetail) | dhbSafeHtml"
              class="line-height-3"
            ></div>
          </div>
        </div>
      </ng-container>
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

  /** TODO: this can be a util */
  getRichMarkup({ description }: BasicPostDetailFragment) {
    const richOptions: Options = {
      renderNode: {
        [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
        [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
        [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      },
    };
    return documentToHtmlString(description?.json, richOptions);
  }
}
