import {
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

@Component({
  selector: 'dhb-page-section-products',
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
        <div [@fadeInDown]>
          <dhb-tab-menu
            [menuItems]="menuItems"
            [activeMenuItem]="activeMenuItem"
          ></dhb-tab-menu>
        </div>
      </div>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Product -->
      <swiper
        [navigation]="true"
        [breakpoints]="
          section.swiperResponsiveOptions || swiperResponsiveOptions
        "
      >
        <ng-container *ngFor="let product of products">
          <ng-template swiperSlide>
            <dhb-product [product]="product"></dhb-product>
          </ng-template>
        </ng-container>
      </swiper>
    </div>
  `,
  styles: [
    `
      @import 'swiper/scss';
      @import 'dhb_swiper_navigation';

      .dhb-tab-menu {
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

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

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
