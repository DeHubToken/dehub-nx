import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  EnvToken,
  ILoggerService,
  IMoralisService,
  LoggerToken,
  MoralisToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  DeHubConnectorNames,
  WalletConnectingMessages,
  WalletConnectingState,
  WalletConnectState,
} from '@dehub/shared/model';
import { shortenAddress } from '@dehub/shared/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'dhb-connect-wallet',
  template: `
    <!-- Wallet Connect Toast -->
    <p-toast></p-toast>

    <!-- Wallet Connect Dialog -->
    <dhb-connect-wallet-dialog
      [header]="label"
      [visible]="showDialog"
      [walletConnectState]="(walletConnectState$ | async)!"
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
  walletConnectState$?: Observable<WalletConnectState>;

  showDialog = false;

  private subtitleSubject = new BehaviorSubject<string>('');
  subtitle$ = this.subtitleSubject.asObservable();

  lottieJson = `${this.env.baseUrl}/assets/dehub/dehub-loader-light-blue.json`;

  constructor(
    @Inject(LoggerToken) private logger: ILoggerService,
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(MoralisToken) private moralisService: IMoralisService
  ) {}

  ngOnInit() {
    const { account$, isAuthenticated$, walletConnectState$ } =
      this.moralisService;

    this.isAuthenticated$ = isAuthenticated$;
    this.walletConnectState$ = walletConnectState$;

    this.label$ = account$.pipe(
      map(account => (account ? shortenAddress(account) : this.label))
    );

    this.loaderVisible$ = walletConnectState$.pipe(
      map(({ state }) => state),
      tap(state => {
        let subtitle = '';
        switch (state) {
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
      map(state =>
        [
          WalletConnectingState.WAITING,
          WalletConnectingState.SWITCH_NETWORK,
          WalletConnectingState.ADD_NETWORK,
        ].includes(state)
      )
    );
  }

  onLogin({
    connectorId,
    email = '',
  }: {
    connectorId: DeHubConnectorNames;
    email?: string;
  }) {
    this.moralisService
      .login(connectorId, this.chainId, email, this.magicLinkApiKey)
      .then(() => (this.showDialog = false))
      .catch(e =>
        this.logger.error(`Moralis '${connectorId}' login problem:`, e)
      );
  }

  onLogout() {
    this.moralisService.logout();
  }
}
