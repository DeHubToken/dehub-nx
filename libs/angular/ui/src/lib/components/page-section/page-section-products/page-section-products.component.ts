import { NgFor, NgIf } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  PageSectionProductsFragment,
  ProductFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import {
  fadeInDownOnEnterAnimation,
  fadeInUpOnEnterAnimation,
} from 'angular-animations';
import { MenuItem } from 'primeng/api';
import { SwiperOptions } from 'swiper';
import { SwiperDirective } from '../../../directives/swiper/swiper.directive';

import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { ProductComponent } from '../../product/product.component';
import { TabMenuComponent } from '../../tab-menu/tab-menu.component';

@Component({
  selector: 'dhb-page-section-products',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    TabMenuComponent,
    ContentfulDraftDirective,
    ProductComponent,
    SwiperDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div
      *ngIf="section"
      [id]="section.sys.id"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 mb-8"
    >
      <div class="flex flex-column md:flex-row md:align-items-center">
        <!-- Title -->
        <h3 *ngIf="section.title as title" class="white-space-nowrap mr-4">
          {{ title }}
        </h3>

        <!-- Categories -->
        <div [@fadeInDown] class="category-tab-menu">
          <dhb-tab-menu
            [menuItems]="menuItems"
            [activeMenuItem]="activeMenuItem"
          />
        </div>
      </div>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Product -->
      <swiper-container dhbSwiper [swiperOptions]="swiperOptions" init="false">
        <swiper-slide *ngFor="let product of products; let i = index">
          <dhb-product
            [product]="product"
            [@fadeInUp]="{ value: '', params: { delay: i * 100 } }"
          />
        </swiper-slide>
      </swiper-container>
    </div>
  `,
  styles: [
    `
      .category-tab-menu .dhb-tab-menu {
        border-bottom: none;
        padding-bottom: 0px;
        margin-bottom: 2rem;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' }),
    fadeInDownOnEnterAnimation({ anchor: 'fadeInDown', delay: 1000 }),
  ],
})
export class PageSectionProductsComponent implements OnInit {
  @Input() section!: PageSectionProductsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;
  @Input() menuItems: MenuItem[] = [];
  @Input() activeMenuItem?: MenuItem;

  products: ProductFragment[] = [];

  swiperOptions?: SwiperOptions;

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.swiperOptions = {
      navigation: true,
      breakpoints:
        this.section.swiperResponsiveOptions || this.swiperResponsiveOptions,
    };

    // Exclude the current category
    this.menuItems = this.menuItems.filter(
      ({ fragment }) => fragment !== this.section.sys.id
    );

    this.products = [
      ...(this.section.handpickedProductsCollection?.items ?? []),
      ...(this.section.productsByCategory?.linkedFrom?.productCollection
        ?.items ?? []),
    ].filter(isNotNil);
  }
}
