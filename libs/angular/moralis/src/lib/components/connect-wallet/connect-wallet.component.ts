import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { EnvToken, IMoralisService, MoralisToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  DeHubConnectorNames,
  WalletConnectingMessages,
  WalletConnectingState,
} from '@dehub/shared/model';
import { shortenAddress } from '@dehub/shared/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
      [isAuthenticated]="(isAuthenticated$ | async)!"
      [icon]="icon"
      (showDialog)="showDialog = !showDialog"
      (logout)="onLogout()"
    ></dhb-connect-wallet-button>

    <!-- Loader -->
    <dhb-loader
      *ngIf="(loaderVisible$ | async)!"
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
  @Input() magicLinkApiKey!: string;

  label$?: Observable<string>;
  isAuthenticated$?: Observable<boolean>;
  loaderVisible$?: Observable<boolean>;

  showDialog = false;

  private subtitleSubject = new BehaviorSubject<string>('');
  subtitle$ = this.subtitleSubject.asObservable();

  lottieJson = `${this.env.baseUrl}/assets/dehub/dehub-loader-light-blue.json`;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(MoralisToken) private moralisService: IMoralisService
  ) {}

  ngOnInit() {
    const { account$, isAuthenticated$, walletConnectingState$ } =
      this.moralisService;

    this.isAuthenticated$ = isAuthenticated$;

    this.label$ = account$.pipe(
      map(account => (account ? shortenAddress(account) : this.label))
    );

    this.loaderVisible$ = walletConnectingState$.pipe(
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
          ![
            WalletConnectingState.INIT,
            WalletConnectingState.COMPLETE,
          ].includes(walletConnectingState)
      )
    );
  }

  onLogin({
    provider,
    email = '',
  }: {
    provider: DeHubConnectorNames;
    email?: string;
  }) {
    this.moralisService.login(
      provider,
      this.chainId,
      email,
      this.magicLinkApiKey
    );
    this.showDialog = false;
  }

  onLogout() {
    this.moralisService.logout();
  }
}
