import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractConnectWalletComponent } from './abstract-connect-wallet.component';

@Component({
  selector: 'dhb-connect-wallet-base',
  template: `
    <div class="text-center">
      <i
        class="fa-duotone fa-key-skeleton-left-right icon-color-duotone-1 text-6xl mt-4"
      ></i>
      <h6 class="mt-5 mb-6">
        To continue, you have to connect your wallet first.
      </h6>
      <div class="mb-8">
        <p-button
          [label]="'Connect Wallet'"
          [icon]="'fas fa-wallet'"
          (onClick)="onConnectClick()"
        ></p-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletRequestComponent
  extends AbstractConnectWalletComponent
  implements OnInit
{
  ngOnInit(): void {
    this.closeDialogOnBackNavigation(false);
  }

  onConnectClick() {
    this.closeDialog(true);
    this.router.navigate(['/', { outlets: { modal: ['auth', 'connect'] } }], {
      queryParamsHandling: 'preserve',
    });
  }
}
