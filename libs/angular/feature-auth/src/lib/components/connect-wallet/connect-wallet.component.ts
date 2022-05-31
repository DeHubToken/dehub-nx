import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoaderService } from '@dehub/angular/core';
import {
  EnvToken,
  ILoggerService,
  IMoralisService,
  LoggerToken,
  MoralisToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  DeHubConnector,
  WalletConnectingState,
  WalletConnectState,
} from '@dehub/shared/model';
import { resolveMessage } from '@dehub/shared/utils';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of, Subscription, zip } from 'rxjs';
import { exhaustMap, filter, first, map, tap } from 'rxjs/operators';

@Component({
  selector: 'dhb-connect-wallet',
  template: `
    <dhb-connect-wallet-options
      [walletConnectState]="(walletConnectState$ | async)!"
      (login)="onLogin($event)"
    ></dhb-connect-wallet-options>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  walletConnectState$?: Observable<WalletConnectState>;

  constructor(
    @Inject(LoggerToken) private logger: ILoggerService,
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(MoralisToken) private moralisService: IMoralisService,
    public ref: DynamicDialogRef,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    const { walletConnectState$ } = this.moralisService;

    this.walletConnectState$ = walletConnectState$;

    // Show/Hide loader
    this.sub = walletConnectState$
      .pipe(
        map(({ state }) => state),
        exhaustMap(state => zip(of(state), of(resolveMessage(state)))),
        tap(([state, subtitle]) => {
          if (
            [
              WalletConnectingState.WAITING,
              WalletConnectingState.SWITCH_NETWORK,
              WalletConnectingState.ADD_NETWORK,
            ].includes(state)
          ) {
            this.loaderService.show(subtitle);
          } else {
            this.loaderService.hide();
          }
        })
      )
      .subscribe();

    // Close dialog on back navigation
    this.router.events
      .pipe(
        filter(
          e =>
            e instanceof NavigationStart && e.navigationTrigger === 'popstate'
        ),
        first()
      )
      .subscribe(() => this.ref.close(true));
  }

  onLogin({ connectorId, email = '' }: DeHubConnector) {
    this.moralisService
      .login(
        connectorId,
        this.env.web3.chainId,
        email,
        this.env.web3.auth.magicLinkApiKey
      )
      .then(() => this.ref.close(true))
      .catch(e =>
        this.logger.error(`Moralis '${connectorId}' login problem:`, e)
      );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
