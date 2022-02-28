import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PageSectionBasicPostsFragment,
  PageSectionFaQsFragment,
  PageSectionFeaturePostsFragment,
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
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionsComponent implements OnInit {
  @Input() sections?: PageSection[];
  @Input() featurePostsResponsiveOptions?: SwiperResponsiveOptions;
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
}
