import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DehubMoralisToken, IDehubMoralisService } from '@dehub/angular/model';
import { BackAwareComponent } from '@dehub/angular/ui/components/back-aware/back-aware.component';
import {
  NavigationTabMenu,
  OrderStatus,
  ProductDetailFragment,
  ShopOrder,
  animationDuration,
} from '@dehub/shared/model';
import { filterNil, publishReplayRefCount } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Observable, map, switchMap } from 'rxjs';
import { ProductDetailComponent } from './components/product-detail.component';
import { ProductDetailService } from './services';
@Component({
  standalone: true,
  imports: [
    // Angular
    RouterLink,
    // UI
    BackAwareComponent,
    ProductDetailComponent,
  ],
  template: `
    <div [@fadeInUp] class="grid">
      <div
        class="col-12 lg:col-12 xl:col-8 col-offset-0 lg:col-offset-0 xl:col-offset-2"
      >
        <dhb-back-aware [backRouterLink]="routerLink">
          <!-- Product Detail -->
          <dhb-product-detail
            [productDetail$]="productDetail$"
            [productOrders$]="productOrders$"
          />
        </dhb-back-aware>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'fadeInUp',
      duration: animationDuration,
    }),
  ],
})
export default class AngularFeatureShopProductDetailComponent
  implements OnInit
{
  productDetail$: Observable<ProductDetailFragment> = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('slug') ?? undefined),
    switchMap(slug => this.productDetailService.getProductDetailBySlug(slug)),
    filterNil(),
    publishReplayRefCount()
  );

  productOrders$: Observable<ShopOrder[]> = this.productDetail$.pipe(
    map(({ sys: { id } }) => id),
    switchMap(contentfulId =>
      this.dehubMoralis.getDeHubShopOrders$({
        contentfulId,
        orderStatus: OrderStatus.verified,
      })
    ),
    map(orders => orders ?? []),
    publishReplayRefCount()
  );

  routerLink = [`/${NavigationTabMenu.Shop}`];

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService,
    @Inject(DehubMoralisToken) private dehubMoralis: IDehubMoralisService
  ) {}

  ngOnInit() {}
}
