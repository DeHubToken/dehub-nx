import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractConnectWalletComponent } from './abstract-connect-wallet.component';

@Component({
  selector: 'dhb-connected-wallet',
  standalone: true,
  template: `
    <div class="text-center">
      <i class="fa-duotone fa-thumbs-up icon-color-duotone-1 text-6xl mt-4"></i>
      <h6 class="mt-5 mb-6">
        You are already connected.
        <br />
        Please close this window and continue.
      </h6>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedWalletComponent
  extends AbstractConnectWalletComponent
  implements OnInit
{
  ngOnInit() {
    this.closeDialogOnBackNavigation();
  }
}
