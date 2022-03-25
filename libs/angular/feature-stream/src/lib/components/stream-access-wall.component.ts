import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageAccessWallCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { PageAccessWallFragment } from '@dehub/shared/model';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container
      *ngIf="pageStreamAccessWall$ | async as pageStreamAccessWall"
      class="grid"
    >
      <!-- Titles -->
      <dhb-page-header [page]="pageStreamAccessWall"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageStreamAccessWall.sectionsCollection?.items"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
