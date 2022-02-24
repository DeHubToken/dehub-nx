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
  PageSectionFeaturePostsFragment,
  PageSectionIconTilesFragment,
} from '@dehub/shared/model';
import {
  bounceInLeftOnEnterAnimation,
  bounceInRightOnEnterAnimation,
} from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type PageHomeSectionsItemType =
  | PageSectionFeaturePostsFragment
  | PageSectionBasicPostsFragment
  | PageSectionIconTilesFragment
  | PageSectionFaQsFragment
  | undefined
  | null;

@Component({
  template: `
    <ng-container *ngIf="pageHome$ | async as pageHome" class="grid">
      <!-- Titles -->
      <div [@bounceInLeft] class="col-12">
        <h3>{{ pageHome.mainTitle }}</h3>
        <h4>{{ pageHome.subtitle }}</h4>
      </div>

      <!-- Page Sections -->
      <ng-container *ngFor="let section of pageHome.sectionsCollection?.items">
        <!-- Feature Posts -->
        <ng-container *ngIf="isPageSectionFeaturePosts(section)">
          <dhb-page-section-feature-posts
            [section]="section"
          ></dhb-page-section-feature-posts>
        </ng-container>

        <!-- Basic Posts -->
        <ng-container *ngIf="isPageSectionBasicPosts(section)">
          <dhb-page-section-basic-posts
            [section]="section"
          ></dhb-page-section-basic-posts>
        </ng-container>

        <!-- Icon Tiles -->
        <dhb-page-section-icon-tiles
          *ngIf="isPageSectionIconTiles(section)"
          [section]="section"
        ></dhb-page-section-icon-tiles>

        <!-- FaQs -->
        <dhb-page-section-faqs
          *ngIf="isPageSectionFaQs(section)"
          [section]="section"
        ></dhb-page-section-faqs>
      </ng-container>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' }),
    bounceInRightOnEnterAnimation({ anchor: 'bounceInRight', delay: 300 }),
  ],
})
export class AngularFeatureHomeComponent implements OnInit {
  pageHome$?: Observable<PageHomeFragment | undefined>;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageHomeCollectionService: PageHomeCollectionService
  ) {}

  ngOnInit() {
    this.pageHome$ = this.pageHomeCollectionService
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

  isPageSectionFeaturePosts(
    pageHomeSectionsItem: PageHomeSectionsItemType
  ): pageHomeSectionsItem is PageSectionFeaturePostsFragment {
    return (
      !!pageHomeSectionsItem &&
      pageHomeSectionsItem.__typename === 'PageSectionFeaturePosts'
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
