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
    const productDetails = this.route.snapshot.data['productDetails'];
    const data: ProductCheckoutDetail = {
      picture: productDetails.picturesCollection?.items[0],
      name: productDetails.name,
      description: richMarkupToPlainString(productDetails.fullDescription.json),
      availableQuantity: productDetails.availableQuantity,
      category: productDetails.category,
      price: productDetails.price,
      currency: productDetails.currency,
      contentfulId: productDetails.sys.id,
      sku: productDetails.sku,
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
