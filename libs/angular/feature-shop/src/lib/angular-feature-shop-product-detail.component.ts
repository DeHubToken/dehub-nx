import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailFragment } from '@dehub/shared/model';
import { filterNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { map, Observable, switchMap } from 'rxjs';
import { ProductDetailService } from './services';
@Component({
  template: `
    <div [@fadeInUp] class="grid">
      <div
        class="col-12 lg:col-12 xl:col-8 col-offset-0 lg:col-offset-0 xl:col-offset-2"
      >
        <!-- Back (top) -->
        <dhb-back-button [routerLink]="['/shop']"></dhb-back-button>

        <!-- Basic Post Detail -->
        <dhb-product-detail
          [productDetail$]="productDetail$"
        ></dhb-product-detail>

        <!-- Back (bottom) -->
        <dhb-back-button [routerLink]="['/shop']"></dhb-back-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 300 })],
})
export class AngularFeatureShopProductDetailComponent implements OnInit {
  productDetail$?: Observable<ProductDetailFragment>;

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit() {
    this.productDetail$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('slug') ?? undefined),
      switchMap(slug => this.productDetailService.getProductDetailBySlug(slug)),
      filterNil()
    );
  }
}
