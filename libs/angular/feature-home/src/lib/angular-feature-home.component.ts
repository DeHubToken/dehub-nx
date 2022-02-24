import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageHomeCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  CarouselResponsiveOptions,
  PageHomeFragment,
  PageSectionBasicPostsFragment,
  PageSectionFaQsFragment,
  PageSectionFeaturePostsFragment,
  PageSectionIconTilesFragment,
} from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
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
        <dhb-page-section-feature-posts
          *ngIf="isPageSectionFeaturePosts(section)"
          [section]="section"
          [carouselResponsiveOptions]="featurePostsResponsiveOptions"
        ></dhb-page-section-feature-posts>

        <!-- Basic Posts -->
        <dhb-page-section-basic-posts
          *ngIf="isPageSectionBasicPosts(section)"
          [section]="section"
          [carouselResponsiveOptions]="basicPostsResponsiveOptions"
        ></dhb-page-section-basic-posts>

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
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureHomeComponent implements OnInit {
  pageHome$?: Observable<PageHomeFragment | undefined>;

  featurePostsResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: '1290px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 1.15,
      numScroll: 1.15,
    },
  ];

  basicPostsResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: '1570px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '700px',
      numVisible: 1.15,
      numScroll: 1.15,
    },
  ];

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
