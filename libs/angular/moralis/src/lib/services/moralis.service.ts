import { Inject, Injectable } from '@angular/core';
import { LoggerService, LoggerToken } from '@dehub/angular/core';
import {
  MoralisWeb3ProviderType,
  WalletConnectingState,
} from '@dehub/shared/model';
import {
  filterEmpty,
  publishReplayRefCount,
  setupMetamaskNetwork,
} from '@dehub/shared/util';
import * as events from 'events';
import { Moralis } from 'moralis';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/moralis.models';

interface IMoralis {
  user$: Observable<User | undefined>;
  isAuthenticated$: Observable<boolean>;

  username$: Observable<string>;
  canPlay$: Observable<boolean>;

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
    // Need to refetch current user for updated attributes
    switchMap(currentUser =>
      currentUser ? from(currentUser.fetch() as Promise<User>) : of(undefined)
    ),
    tap(loggedInUser =>
      this.logger.info(
        `Current user: ${loggedInUser?.attributes.username}, can_play: ${loggedInUser?.attributes.can_play}`
      )
    )
  );

  private userAttributes$ = this.user$.pipe(map(user => user?.attributes));

  isAuthenticated$ = this.user$.pipe(map(user => !!user));

  canPlay$ = this.userAttributes$.pipe(
    map(attributes => attributes?.can_play ?? false)
  );

  username$ = this.userAttributes$.pipe(
    filterEmpty(),
    map(({ username }) => username)
  );

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
    const signingMessage = 'DeHub D’App';

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
            this.userSubject.next(loggedInUser as User);
          } else {
            this.logout();
          }
        })
      : Moralis.authenticate({ signingMessage, provider }).then(loggedInUser =>
          this.userSubject.next(loggedInUser as User)
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
