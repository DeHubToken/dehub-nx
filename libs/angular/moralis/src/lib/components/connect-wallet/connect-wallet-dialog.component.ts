import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { ProviderTypes } from '@dehub/shared/moralis';

@Component({
  selector: 'dhb-connect-wallet-dialog',
  template: `
    <p-dialog
      [modal]="true"
      [draggable]="false"
      [header]="header"
      [(visible)]="visible"
      [style]="{ width: '350px' }"
      class="p-fluid"
    >
      <div class="mt-2 mb-3">
        <!-- Metamask -->
        <p-button label="Metamask" (onClick)="login.emit('metamask')">
          <img
            [src]="path + '/assets/dehub/icons/metamask.svg'"
            [ngStyle]="{
              width: '32px',
              height: '16px',
              paddingRight: '10px'
            }"
          />
        </p-button>
      </div>
      <div class="mt-2 mb-3 md:hidden">
        <!-- Trust Wallet (visible on Mobile only) -->
        <p-button label="Trust Wallet" (onClick)="login.emit('metamask')">
          <img
            [src]="path + '/assets/dehub/icons/trustwallet.svg'"
            [ngStyle]="{
              width: '32px',
              height: '20px',
              paddingRight: '10px',
              marginLeft: '-1px'
            }"
          />
        </p-button>
      </div>
      <div class="mt-2 mb-3">
        <!-- Walletconnect -->
        <p-button label="WalletConnect" (onClick)="login.emit('walletconnect')">
          <img
            [src]="path + '/assets/dehub/icons/walletconnect.svg'"
            [ngStyle]="{
              width: '32px',
              height: '11px',
              paddingRight: '10px'
            }"
          />
        </p-button>
      </div>
    </p-dialog>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletDialogComponent implements OnInit {
  @Input() header = 'Connect Wallet';
  @Input() visible = false;

  path = this.env.baseUrl;

  @Output() login = new EventEmitter<ProviderTypes>();

  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  ngOnInit() {}
}
