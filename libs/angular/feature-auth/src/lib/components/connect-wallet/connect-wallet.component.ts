import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  LoaderService,
  provideDehubLoggerWithScope,
} from '@dehub/angular/core';
import {
  EnvToken,
  ILoggerService,
  IMoralisService,
  LoggerDehubToken,
  MoralisToken,
} from '@dehub/angular/model';
import {
  DeHubConnector,
  SharedEnv,
  WalletConnectState,
  WalletConnectingState,
} from '@dehub/shared/model';
import { resolveMessage } from '@dehub/shared/utils';
import { PushModule } from '@rx-angular/template/push';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { AbstractConnectWalletComponent } from './abstract-connect-wallet.component';
import { ConnectWalletOptionsComponent } from './connect-wallet-options.component';

@Component({
  selector: 'dhb-connect-wallet',
  template: `
    <dhb-connect-wallet-options
      [walletConnectState]="walletConnectState$ | push"
      (login)="onLogin($event)"
    ></dhb-connect-wallet-options>
  `,

  providers: [...provideDehubLoggerWithScope('Connect Wallet')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ConnectWalletOptionsComponent, PushModule],
})
export class ConnectWalletComponent
  extends AbstractConnectWalletComponent
  implements OnInit, OnDestroy
{
  private sub?: Subscription;
  walletConnectState$?: Observable<WalletConnectState>;

  constructor(
    @Inject(LoggerDehubToken) private logger: ILoggerService,
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(MoralisToken) private moralisService: IMoralisService,
    private loaderService: LoaderService,
    protected override dialogRef: DynamicDialogRef,
    protected override router: Router
  ) {
    super(router, dialogRef);
  }

  ngOnInit() {
    this.closeDialogOnBackNavigation();

    const { walletConnectState$ } = this.moralisService;

    this.walletConnectState$ = walletConnectState$;

    // Show/Hide loader
    this.sub = walletConnectState$.subscribe(({ state }) =>
      [
        WalletConnectingState.WAITING,
        WalletConnectingState.SWITCH_NETWORK,
        WalletConnectingState.ADD_NETWORK,
      ].includes(state)
        ? this.loaderService.show(resolveMessage(state))
        : this.loaderService.hide()
    );
  }

  onLogin({ connectorId, email = '' }: DeHubConnector) {
    this.moralisService
      .login(
        connectorId,
        this.env.web3.chainId,
        email,
        this.env.web3.auth.magicLinkApiKey
      )
      .then(() => this.closeDialog(true))
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
