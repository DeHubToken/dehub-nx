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

      <!-- Dapp Posts -->
      <dhb-page-section-dapp-posts
        *ngIf="isPageSectionDappPosts(section)"
        [section]="section"
      ></dhb-page-section-dapp-posts>

      <!-- Grand Posts -->
      <dhb-page-section-grand-posts
        *ngIf="isPageSectionGrandPosts(section)"
        [section]="section"
      ></dhb-page-section-grand-posts>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionsComponent implements OnInit {
  @Input() sections?: PageSection[];
  @Input() featurePostsResponsiveOptions?: SwiperResponsiveOptions;
  @Input() thumbnailPostsResponsiveOptions?: SwiperResponsiveOptions;
  @Input() basicPostsResponsiveOptions?: SwiperResponsiveOptions;

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
}
