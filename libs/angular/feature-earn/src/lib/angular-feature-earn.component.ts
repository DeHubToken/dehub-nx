import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageEarnCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { PageEarnFragment } from '@dehub/shared/model';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="pageEarn$ | async as pageEarn" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageEarn"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageEarn.sectionsCollection?.items"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureEarnComponent implements OnInit {
  pageEarn$?: Observable<PageEarnFragment | undefined>;

  path = this.env.baseUrl;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageEarnCollectionService: PageEarnCollectionService
  ) {}

  ngOnInit() {
    this.pageEarn$ = this.pageEarnCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageEarnCollection } }) =>
            pageEarnCollection?.items[0] ?? undefined
        )
      );
  }
}
