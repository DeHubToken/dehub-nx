import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCollectionBySlugService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { ProductDetailFragment } from '@dehub/shared/model';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
          [productDetail]="(productDetail$ | async)!"
        ></dhb-product-detail>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 300 })],
})
export class AngularFeatureShopProductDetailComponent implements OnInit {
  productDetail$!: Observable<ProductDetailFragment | undefined>;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private route: ActivatedRoute,
    private productDetailsBySlugService: ProductCollectionBySlugService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? undefined;

    this.productDetail$ = this.productDetailsBySlugService
      .fetch({
        slug,
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { productCollection } }) =>
            productCollection?.items[0] ?? undefined
        )
      );
  }
}
