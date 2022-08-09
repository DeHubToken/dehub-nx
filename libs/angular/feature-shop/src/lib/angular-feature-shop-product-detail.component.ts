import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailFragment } from '@dehub/shared/model';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductDetailService } from './services';
@Component({
  template: `
    <div [@fadeInUp] class="grid">
      <div
        class="col-12 lg:col-12 xl:col-8 col-offset-0 lg:col-offset-0 xl:col-offset-2"
      >
        <!-- Back -->
        <p-button
          label="Back"
          icon="fas fa-long-arrow-left"
          [routerLink]="['/shop']"
          styleClass="p-button-link p-button-lg mb-2"
        >
        </p-button>

        <!-- Basic Post Detail -->
        <dhb-product-detail
          [productDetail]="productDetail$ | push"
        ></dhb-product-detail>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 300 })],
})
export class AngularFeatureShopProductDetailComponent implements OnInit {
  productDetail$?: Observable<ProductDetailFragment | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit() {
    this.productDetail$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('slug') ?? undefined),
      switchMap(slug => this.productDetailService.getProductDetailBySlug(slug))
    );
  }
}
