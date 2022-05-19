import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CheckoutFormComponent } from './components/checkout-form.component';

@Component({
  selector: 'dhb-checkout-modal',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureShopCheckoutComponent implements OnInit {
  constructor(private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    const ref = this.dialogService.open(CheckoutFormComponent, {
      showHeader: true,
      header: 'Checkout',
      width: '620px',
      // height: '100%',
      styleClass: 'bg-gradient-3 border-neon-1',
      closeOnEscape: true,
      dismissableMask: true,
      closable: true,
    });

    ref.onClose.subscribe(() => {
      this.router.navigate(['shop', { outlets: { modal: null } }], {
        replaceUrl: true,
      });
    });
  }
}
