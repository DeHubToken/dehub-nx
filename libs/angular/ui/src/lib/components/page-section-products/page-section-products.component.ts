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
import { fadeInUpOnEnterAnimation } from 'angular-animations';

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
      <h3 *ngIf="section.title as title">{{ title }}</h3>
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
      @import '@dehub/swiper/dhb_swiper_navigation';
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionProductsComponent implements OnInit {
  @Input() section!: PageSectionProductsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  products: ProductFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.products = [
      ...(this.section.handpickedProductsCollection?.items ?? []),
      ...(this.section.productsByCategory?.linkedFrom?.productCollection
        ?.items ?? []),
    ].filter(isNotNil);
  }
}
