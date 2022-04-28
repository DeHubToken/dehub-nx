import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PageSectionBasicPostsFragment,
  PageSectionDappPostsFragment,
  PageSectionFaQsFragment,
  PageSectionFeaturePostsFragment,
  PageSectionGrandPostsFragment,
  PageSectionIconTilesFragment,
  PageSectionPersonPostsFragment,
  PageSectionSectionPostsFragment,
  PageSectionThumbnailPostsFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';

type PageSection =
  | PageSectionFeaturePostsFragment
  | PageSectionThumbnailPostsFragment
  | PageSectionBasicPostsFragment
  | PageSectionIconTilesFragment
  | PageSectionFaQsFragment
  | PageSectionDappPostsFragment
  | PageSectionGrandPostsFragment
  | PageSectionSectionPostsFragment
  | PageSectionPersonPostsFragment
  | undefined
  | null;

@Component({
  selector: 'dhb-page-sections',
  template: `
    <ng-container *ngFor="let section of sections">
      <!-- Feature Posts -->
      <dhb-page-section-feature-posts
        *ngIf="isPageSectionFeaturePosts(section)"
        [section]="section"
        [swiperResponsiveOptions]="featurePostsResponsiveOptions"
      ></dhb-page-section-feature-posts>

      <!-- Thumbnail Posts -->
      <dhb-page-section-thumbnail-posts
        *ngIf="isPageSectionThumbnailPosts(section)"
        [section]="section"
        [swiperResponsiveOptions]="thumbnailPostsResponsiveOptions"
      ></dhb-page-section-thumbnail-posts>

      <!-- Basic Posts -->
      <dhb-page-section-basic-posts
        *ngIf="isPageSectionBasicPosts(section)"
        [section]="section"
        [swiperResponsiveOptions]="basicPostsResponsiveOptions"
      ></dhb-page-section-basic-posts>

      <!-- Icon Tiles Swiper -->
      <dhb-page-section-icon-tiles-swiper
        *ngIf="
          isPageSectionIconTiles(section) && section.isSwiper;
          else iconTiles
        "
        [section]="section"
        [swiperResponsiveOptions]="iconTilesResponsiveOptions"
      ></dhb-page-section-icon-tiles-swiper>

      <!-- Icon Tiles -->
      <ng-template #iconTiles>
        <dhb-page-section-icon-tiles
          *ngIf="isPageSectionIconTiles(section)"
          [section]="section"
        ></dhb-page-section-icon-tiles>
      </ng-template>

      <!-- FaQs -->
      <dhb-page-section-faqs
        *ngIf="isPageSectionFaQs(section)"
        [section]="section"
      ></dhb-page-section-faqs>

      <!-- Dapp Posts -->
      <dhb-page-section-dapp-posts
        *ngIf="isPageSectionDappPosts(section)"
        [section]="section"
      ></dhb-page-section-dapp-posts>

      <!-- Grand Posts -->
      <dhb-page-section-grand-posts-swiper
        *ngIf="
          isPageSectionGrandPosts(section) && section.isSwiper;
          else grandPosts
        "
        [section]="section"
        [swiperResponsiveOptions]="grandPostsResponsiveOptions"
      ></dhb-page-section-grand-posts-swiper>

      <ng-template #grandPosts>
        <dhb-page-section-grand-posts
          *ngIf="isPageSectionGrandPosts(section)"
          [section]="section"
        ></dhb-page-section-grand-posts>
      </ng-template>

      <!-- Section Posts -->
      <dhb-page-section-section-posts
        *ngIf="isPageSectionSectionPosts(section)"
        [section]="section"
      ></dhb-page-section-section-posts>

      <!-- Person Posts Swiper -->
      <dhb-page-section-person-posts-swiper
        *ngIf="
          isPageSectionPersonPosts(section) && section.isSwiper;
          else personPosts
        "
        [section]="section"
        [path]="path"
      ></dhb-page-section-person-posts-swiper>

      <ng-template #personPosts>
        <dhb-page-section-person-posts
          *ngIf="isPageSectionPersonPosts(section)"
          [section]="section"
          [path]="path"
        ></dhb-page-section-person-posts>
      </ng-template>

      <!-- Pie Chart Posts -->
      <!-- <dhb-page-section-chart-posts> </dhb-page-section-chart-posts> -->
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionsComponent implements OnInit {
  @Input() sections?: PageSection[];
  @Input() path?: string;
  @Input() featurePostsResponsiveOptions?: SwiperResponsiveOptions;
  @Input() thumbnailPostsResponsiveOptions?: SwiperResponsiveOptions;
  @Input() basicPostsResponsiveOptions?: SwiperResponsiveOptions;
  @Input() iconTilesResponsiveOptions?: SwiperResponsiveOptions;
  @Input() grandPostsResponsiveOptions?: SwiperResponsiveOptions;

  constructor() {}

  ngOnInit() {}

  isPageSectionFeaturePosts(
    pageSection: PageSection
  ): pageSection is PageSectionFeaturePostsFragment {
    return (
      !!pageSection && pageSection.__typename === 'PageSectionFeaturePosts'
    );
  }

  isPageSectionThumbnailPosts(
    pageSection: PageSection
  ): pageSection is PageSectionThumbnailPostsFragment {
    return (
      !!pageSection && pageSection.__typename === 'PageSectionThumbnailPosts'
    );
  }

  isPageSectionBasicPosts(
    pageSection: PageSection
  ): pageSection is PageSectionBasicPostsFragment {
    return !!pageSection && pageSection.__typename === 'PageSectionBasicPosts';
  }

  isPageSectionIconTiles(
    pageSection: PageSection
  ): pageSection is PageSectionIconTilesFragment {
    return !!pageSection && pageSection.__typename === 'PageSectionIconTiles';
  }

  isPageSectionFaQs(
    pageSection: PageSection
  ): pageSection is PageSectionFaQsFragment {
    return !!pageSection && pageSection.__typename === 'PageSectionFaQs';
  }

  isPageSectionDappPosts(
    pageSection: PageSection
  ): pageSection is PageSectionDappPostsFragment {
    return !!pageSection && pageSection.__typename === 'PageSectionDappPosts';
  }

  isPageSectionGrandPosts(
    pageSection: PageSection
  ): pageSection is PageSectionGrandPostsFragment {
    return !!pageSection && pageSection.__typename === 'PageSectionGrandPosts';
  }

  isPageSectionSectionPosts(
    pageSection: PageSection
  ): pageSection is PageSectionSectionPostsFragment {
    return (
      !!pageSection && pageSection.__typename === 'PageSectionSectionPosts'
    );
  }

  isPageSectionPersonPosts(
    pageSection: PageSection
  ): pageSection is PageSectionPersonPostsFragment {
    return !!pageSection && pageSection.__typename === 'PageSectionPersonPosts';
  }
}
