import { Inject, Injectable } from '@angular/core';
import { LoggerService, LoggerToken } from '@dehub/angular/core';
import {
  MoralisWeb3ProviderType,
  WalletConnectingState,
} from '@dehub/shared/models';
import {
  publishReplayRefCount,
  setupMetamaskNetwork,
} from '@dehub/shared/utils';
import * as events from 'events';
import { Moralis } from 'moralis';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/moralis.models';

interface IMoralis {
  user$: Observable<User | undefined>;
  isAuthenticated$: Observable<boolean>;
  login: (provider: MoralisWeb3ProviderType, chainId: number) => void;
  logout: () => void;

  walletConnectingState$: Observable<WalletConnectingState>;
  setWalletConnectingState: (state: WalletConnectingState) => void;
}
@Injectable()
export class MoralisService implements IMoralis {
  private userSubject = new BehaviorSubject<User | undefined>(
    Moralis.User.current()
  );

  user$ = this.userSubject.asObservable().pipe(
    tap(loggedInUser =>
      this.logger.info(`Current user: ${loggedInUser?.attributes.username}`)
    ),
    publishReplayRefCount()
  );

  isAuthenticated$ = this.user$.pipe(map(user => !!user));

  private walletConnectingStateSubject =
    new BehaviorSubject<WalletConnectingState>(WalletConnectingState.INIT);

  walletConnectingState$ = this.walletConnectingStateSubject
    .asObservable()
    .pipe(
      tap(walletConnectingState =>
        this.logger.info(
          `Wallet Connecting State: ${WalletConnectingState[walletConnectingState]}`
        )
      ),
      publishReplayRefCount()
    );

  /** Triggered after user closed the session from his wallet (Walletconnect) */
  private unsubscribeFromWeb3Deactivated?: () => events.EventEmitter;

  constructor(@Inject(LoggerToken) private logger: LoggerService) {}

  login(provider: MoralisWeb3ProviderType, chainId: number) {
    this.setWalletConnectingState(WalletConnectingState.WAITING);
    const signingMessage = 'DeHub Dapp';

    (provider === 'metamask'
      ? Moralis.authenticate({ signingMessage }).then(async loggedInUser => {
          if (
            await setupMetamaskNetwork(
              chainId,
              () =>
                this.setWalletConnectingState(
                  WalletConnectingState.SWITCH_NETWORK
                ),
              () =>
                this.setWalletConnectingState(WalletConnectingState.ADD_NETWORK)
            )
          ) {
            this.userSubject.next(loggedInUser);
          } else {
            this.logout();
          }
        })
      : Moralis.authenticate({ signingMessage, provider }).then(loggedInUser =>
          this.userSubject.next(loggedInUser)
        )
    )
      .then(() => this.setWalletConnectingState(WalletConnectingState.COMPLETE))
      .catch(e => {
        this.setWalletConnectingState(WalletConnectingState.INIT);
        this.logger.error(`Moralis '${provider}' login error:`, e);
      })
      .finally(() => this.subscribeEvents());
  }

  logout() {
    this.unsubscribeEvents();
    Moralis.User.logOut()
      // Set user to undefined
      .then(() => this.userSubject.next(undefined))
      // Disconnect Web3 wallet
      .then(() => Moralis.cleanup())
      .catch(e => this.logger.error('Moralis logout error:', e))
      // Update wallet connecting state
      .finally(() => this.setWalletConnectingState(WalletConnectingState.INIT));
  }

  setWalletConnectingState(state: WalletConnectingState) {
    this.walletConnectingStateSubject.next(state);
  }

  private subscribeEvents() {
    this.unsubscribeFromWeb3Deactivated = Moralis.onWeb3Deactivated(error => {
      this.logger.info(
        `Moralis ${error.connector.type} connector was deactivated! Logging out.`
      );
      this.logout();
    });
  }

  private unsubscribeEvents() {
    this.unsubscribeFromWeb3Deactivated?.();
  }

  // TODO: set account Moralis.onAccountChanged
  // window.localStorage.removeItem(moralisProviderLocalStorageKey);
  // EnableWEb3
}
