import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailFragment } from '@dehub/shared/model';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
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
          [productDetail]="productDetails"
        ></dhb-product-detail>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 300 })],
})
export class AngularFeatureShopProductDetailComponent implements OnInit {
  productDetails?: ProductDetailFragment;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productDetails = this.route.snapshot.data['productDetails'];
  }
}
