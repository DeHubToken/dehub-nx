import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  ProviderTypes,
  WalletConnectingMessages,
  WalletConnectingState,
} from '@dehub/shared/moralis';
import { shortenAddress } from '@dehub/shared/utils';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

    <!-- Loader -->
    <dhb-loader
      *ngIf="(visible$ | async)!"
      [subtitle]="(subtitle$ | async)!"
      [lottieJson]="lottieJson"
    ></dhb-loader>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletComponent implements OnInit {
  @Input() label = 'Connect Wallet';
  @Input() icon = 'fas fa-wallet';
  @Input() chainId!: number;

  showDialog = false;

  user$ = this.moralisService.user$;
  label$ = this.moralisService.user$.pipe(
    map(user =>
      user ? shortenAddress(user.attributes.ethAddress) : this.label
    )
  );
  userLoggedIn$ = this.moralisService.userLoggedIn$;

  private subtitleSubject = new BehaviorSubject<string>('');
  subtitle$ = this.subtitleSubject.asObservable();

  visible$ = this.moralisService.walletConnectingState$.pipe(
    tap(walletConnectingState => {
      let subtitle = '';
      switch (walletConnectingState) {
        case WalletConnectingState.SWITCH_NETWORK:
          subtitle = WalletConnectingMessages.SWITCH_NETWORK;
          break;
        case WalletConnectingState.ADD_NETWORK:
          subtitle = WalletConnectingMessages.ADD_NETWORK;
          break;
        default:
          subtitle = WalletConnectingMessages.WAITING;
      }
      this.subtitleSubject.next(subtitle);
    }),
    map(
      walletConnectingState =>
        ![WalletConnectingState.INIT, WalletConnectingState.COMPLETE].includes(
          walletConnectingState
        )
    )
  );

  lottieJson = `${this.env.baseUrl}/assets/dehub/dehub-loader-light-blue.json`;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private moralisService: MoralisService
  ) {}

  ngOnInit() {}

  onLogin(provider: ProviderTypes) {
    this.moralisService.login(provider, this.chainId);
    this.showDialog = false;
  }

  onLogout() {
    this.moralisService.logout();
  }
}
