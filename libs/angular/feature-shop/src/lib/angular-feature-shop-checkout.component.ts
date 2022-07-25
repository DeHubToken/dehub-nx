import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCheckoutDetail } from '@dehub/shared/model';
import { richMarkupToPlainString } from '@dehub/shared/utils';
import { DialogService } from 'primeng/dynamicdialog';
import { CheckoutFormComponent } from './components/checkout-form.component';

@Component({
  selector: 'dhb-checkout-modal',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureShopCheckoutComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productDetail = this.route.snapshot.data['productDetail'];
    const data: ProductCheckoutDetail = {
      picture: productDetail.picturesCollection?.items[0],
      name: productDetail.name,
      description: richMarkupToPlainString(productDetail.fullDescription.json),
      availableQuantity: productDetail.availableQuantity,
      category: productDetail.category,
      price: productDetail.price,
      currency: productDetail.currency,
      contentfulId: productDetail.sys.id,
      sku: productDetail.sku,
    };
    const ref = this.dialogService.open(CheckoutFormComponent, {
      showHeader: true,
      header: 'Checkout',
      width: '620px',
      styleClass: 'bg-gradient-3 border-neon-1',
      closeOnEscape: false,
      dismissableMask: false,
      closable: false,
      data,
    });

    ref.onClose.subscribe(() => {
      this.router.navigate(['shop', { outlets: { modal: null } }], {
        replaceUrl: true,
      });
    });
  }
}
