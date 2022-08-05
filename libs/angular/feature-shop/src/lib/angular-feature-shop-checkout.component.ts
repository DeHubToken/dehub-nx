import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCheckoutDetail } from '@dehub/shared/model';
import { filterNil, richMarkupToPlainString } from '@dehub/shared/utils';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { map, Observable, switchMap } from 'rxjs';
import { CheckoutFormComponent } from './components/checkout-form.component';
import { ProductDetailService } from './services';

@Component({
  selector: 'dhb-checkout-modal',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureShopCheckoutComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit(): void {
    const productDetail$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('slug') ?? undefined),
      switchMap(slug => this.productDetailService.getProductDetailBySlug(slug)),
      filterNil(),
      map(
        productDetail =>
          ({
            sys: productDetail.sys,
            picture: productDetail.picturesCollection?.items[0],
            name: productDetail.name,
            description: richMarkupToPlainString(
              productDetail?.fullDescription?.json
            ),
            availableQuantity: productDetail.availableQuantity,
            category: productDetail.category,
            price: productDetail.price,
            currency: productDetail.currency,
            contentfulId: productDetail.sys.id,
            sku: productDetail.sku,
          } as ProductCheckoutDetail)
      )
    );

    const ref = this.dialogService.open(CheckoutFormComponent, {
      showHeader: true,
      header: 'Checkout',
      width: '620px',
      styleClass: 'bg-gradient-3 border-neon-1',
      closeOnEscape: false,
      dismissableMask: false,
      closable: false,
      data: { productDetail$ },
    } as DynamicDialogConfig & { data: { productDetail$: Observable<ProductCheckoutDetail> } });

    ref.onClose.subscribe(() => {
      this.router.navigate(['shop', { outlets: { modal: null } }], {
        replaceUrl: true,
      });
    });
  }
}
