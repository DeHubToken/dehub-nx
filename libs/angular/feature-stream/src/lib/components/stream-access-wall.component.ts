import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageAccessWallCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { PageAccessWallFragment } from '@dehub/shared/model';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container
      *ngIf="pageStreamAccessWall$ | async as pageStreamAccessWall"
      class="grid"
    >
      <!-- Titles -->
      <dhb-page-header [page]="pageStreamAccessWall"></dhb-page-header>

      <!-- Hardcoded Instructions -->
      <div
        [@fadeInUp]
        class="col-12 sm:col-12 md:col-8 xl:col-8 col-offset-0 sm:col-offset-0 md:col-offset-2 xl:col-offset-2"
      >
        It's a me again, Mario!
      </div>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageStreamAccessWall.sectionsCollection?.items"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class StreamAccessWallComponent implements OnInit {
  pageStreamAccessWall$?: Observable<PageAccessWallFragment | undefined>;

  path = this.env.baseUrl;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageAccessWallCollectionService: PageAccessWallCollectionService
  ) {}

  ngOnInit() {
    this.pageStreamAccessWall$ = this.pageAccessWallCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageAccessWallCollection } }) =>
            pageAccessWallCollection?.items[0] ?? undefined
        )
      );
  }
}
