import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProviderTypes } from '@dehub/shared/moralis';
import { shortenAddress } from '@dehub/shared/utils';
import { map } from 'rxjs/operators';
import { MoralisService } from '../../services/moralis.service';

@Component({
  selector: 'dhb-connect-wallet',
  template: `
    <!-- Wallet Connect Dialog -->
    <dhb-connect-wallet-dialog
      [header]="label"
      [visible]="showDialog"
      (login)="onLogin($event)"
    ></dhb-connect-wallet-dialog>

    <!-- Wallet Connect Button -->
    <dhb-connect-wallet-button
      [label]="(label$ | async)!"
      [userLoggedIn]="(userLoggedIn$ | async)!"
      [icon]="icon"
      (showDialog)="showDialog = !showDialog"
      (logout)="onLogout()"
    ></dhb-connect-wallet-button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletComponent implements OnInit {
  @Input() label = 'Connect Wallet';
  @Input() icon = 'fas fa-wallet';

  showDialog = false;

  user$ = this.moralisService.user$;
  label$ = this.moralisService.user$.pipe(
    map(user =>
      user ? shortenAddress(user.attributes.ethAddress) : this.label
    )
  );
  userLoggedIn$ = this.moralisService.userLoggedIn$;

  constructor(private moralisService: MoralisService) {}

  ngOnInit() {}

  onLogin(provider: ProviderTypes) {
    this.moralisService.login(provider);
    this.showDialog = false;
  }

  onLogout() {
    this.moralisService.logout();
  }
}
