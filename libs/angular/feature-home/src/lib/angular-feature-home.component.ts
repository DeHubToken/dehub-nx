import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageHomeCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  PageHomeFragment,
  PageSectionBasicPostsFragment,
  PageSectionFaQsFragment,
  PageSectionIconTilesFragment,
} from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type PageHomeSectionsItemType =
  | PageSectionBasicPostsFragment
  | PageSectionIconTilesFragment
  | PageSectionFaQsFragment
  | undefined
  | null;

@Component({
  template: `
    <div class="grid">
      <div *ngIf="pageHome$ | async as pageHome" [@bounceInLeft] class="col-12">
        <h3>{{ pageHome.mainTitle }}</h3>
        <h4>{{ pageHome.subtitle }}</h4>

        <!-- Page Sections -->
        <ng-container
          *ngFor="let section of pageHome.sectionsCollection?.items"
        >
          <!-- Basic Posts -->
          <ng-container *ngIf="isPageSectionBasicPosts(section)">
            <dhb-page-section-basic-posts
              [section]="section"
            ></dhb-page-section-basic-posts>
          </ng-container>

          <!-- Icon Tiles -->
          <ng-container *ngIf="isPageSectionIconTiles(section)">
            <dhb-page-section-icon-tiles
              [section]="section"
            ></dhb-page-section-icon-tiles>
          </ng-container>

          <!-- FaQs -->
          <ng-container *ngIf="isPageSectionFaQs(section)">
            <dhb-page-section-faqs [section]="section"></dhb-page-section-faqs>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureHomeComponent implements OnInit {
  pageHome$?: Observable<PageHomeFragment | undefined>;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageHomeCollection: PageHomeCollectionService
  ) {}

  ngOnInit() {
    this.pageHome$ = this.pageHomeCollection
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageHomeCollection } }) =>
            pageHomeCollection?.items[0] ?? undefined
        )
      );
  }

  isPageSectionBasicPosts(
    pageHomeSectionsItem: PageHomeSectionsItemType
  ): pageHomeSectionsItem is PageSectionBasicPostsFragment {
    return (
      !!pageHomeSectionsItem &&
      pageHomeSectionsItem.__typename === 'PageSectionBasicPosts'
    );
  }

  isPageSectionIconTiles(
    pageHomeSectionsItem: PageHomeSectionsItemType
  ): pageHomeSectionsItem is PageSectionIconTilesFragment {
    return (
      !!pageHomeSectionsItem &&
      pageHomeSectionsItem.__typename === 'PageSectionIconTiles'
    );
  }

  isPageSectionFaQs(
    pageHomeSectionsItem: PageHomeSectionsItemType
  ): pageHomeSectionsItem is PageSectionFaQsFragment {
    return (
      !!pageHomeSectionsItem &&
      pageHomeSectionsItem.__typename === 'PageSectionFaQs'
    );
  }
}
