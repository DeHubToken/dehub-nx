import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PageSectionBasicPostsFragment,
  PageSectionDappPostsFragment,
  PageSectionFaQsFragment,
  PageSectionFeaturePostsFragment,
  PageSectionGrandPostsFragment,
  PageSectionIconTilesFragment,
  PageSectionPersonPostsFragment,
  PageSectionProductsFragment,
  PageSectionSectionPostsFragment,
  PageSectionThumbnailPostsFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { filterNil } from '@dehub/shared/utils';
import { PushModule } from '@rx-angular/template/push';
import { MenuItem } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { PageSectionBasicPostsComponent } from '../page-section-basic-posts/page-section-basic-posts.component';
import { PageSectionDappPostsComponent } from '../page-section-dapp-posts/page-section-dapp-posts.component';
import { PageSectionFaQsComponent } from '../page-section-faqs/page-section-faqs.component';
import { PageSectionFeaturePostsComponent } from '../page-section-feature-posts/page-section-feature-posts.component';
import { PageSectionGrandPostsSwiperComponent } from '../page-section-grand-posts-swiper/page-section-grand-posts-swiper.component';
import { PageSectionGrandPostsComponent } from '../page-section-grand-posts/page-section-grand-posts.component';
import { PageSectionIconTilesSwiperComponent } from '../page-section-icon-tiles-swiper/page-section-icon-tiles-swiper.component';
import { PageSectionIconTilesComponent } from '../page-section-icon-tiles/page-section-icon-tiles.component';
import { PageSectionPersonPostsSwiperComponent } from '../page-section-person-posts-swiper/page-section-person-posts-swiper.component';
import { PageSectionPersonPostsComponent } from '../page-section-person-posts/page-section-person-posts.component';
import { PageSectionProductsComponent } from '../page-section-products/page-section-products.component';
import { PageSectionSectionPostsComponent } from '../page-section-section-posts/page-section-section-posts.component';
import { PageSectionThumbnailPostsComponent } from '../page-section-thumbnail-posts/page-section-thumbnail-posts.component';

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
  | PageSectionProductsFragment
  | undefined
  | null;

@Component({
  selector: 'dhb-page-sections',
  standalone: true,
  imports: [
    // Angular
    NgFor,
    NgIf,
    // UI
    PageSectionFeaturePostsComponent,
    PageSectionThumbnailPostsComponent,
    PageSectionBasicPostsComponent,
    PageSectionIconTilesSwiperComponent,
    PageSectionIconTilesComponent,
    PageSectionFaQsComponent,
    PageSectionDappPostsComponent,
    PageSectionGrandPostsSwiperComponent,
    PageSectionGrandPostsComponent,
    PageSectionSectionPostsComponent,
    PageSectionPersonPostsSwiperComponent,
    PageSectionPersonPostsComponent,
    PageSectionProductsComponent,
    // 3rd Party
    PushModule,
  ],
  templateUrl: './page-sections.component.html',
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
  @Input() productsResponsiveOptions?: SwiperResponsiveOptions;

  productMenuItems: MenuItem[] = [];
  productActiveMenuItem$: Observable<MenuItem | undefined> =
    this.route.fragment.pipe(
      filterNil(),
      map(fragment =>
        this.productMenuItems.find(menuItem => menuItem.fragment === fragment)
      )
    );

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.sections) {
      const productSections = this.sections.filter(
        (section): section is PageSectionProductsFragment =>
          this.isPageSectionProducts(section)
      );

      this.productMenuItems = productSections.map(productSection => ({
        label: productSection.title,
        icon:
          productSection.handpickedProductsCollection?.items[0]?.category
            ?.icon ?? productSection?.productsByCategory?.icon,
        fragment: productSection.sys.id,
        routerLink: ['.'],
      }));
    }
  }

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

  isPageSectionProducts(
    pageSection: PageSection
  ): pageSection is PageSectionProductsFragment {
    return !!pageSection && pageSection.__typename === 'PageSectionProducts';
  }
}
