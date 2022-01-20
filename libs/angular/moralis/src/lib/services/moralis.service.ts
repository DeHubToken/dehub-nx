import { Inject, Injectable } from '@angular/core';
import { LoggerService, LoggerToken } from '@dehub/angular/core';
import { ProviderTypes, WalletConnectingState } from '@dehub/shared/models';
import { publishReplayRefCount, setupNetwork } from '@dehub/shared/utils';
import { Moralis } from 'moralis';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/moralis.models';

interface IMoralis {
  user$: Observable<User | undefined>;
  userLoggedIn$: Observable<boolean>;
  login: (provider: ProviderTypes, chainId: number) => void;
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

  userLoggedIn$ = this.user$.pipe(map(user => !!user));

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

  constructor(@Inject(LoggerToken) private logger: LoggerService) {}

  login(provider: ProviderTypes, chainId: number) {
    this.setWalletConnectingState(WalletConnectingState.WAITING);
    const signingMessage = 'DeHub Dapp';

    (provider === 'metamask'
      ? Moralis.Web3.authenticate({ signingMessage })
      : Moralis.Web3.authenticate({ signingMessage, provider })
    )
      .then(async loggedInUser => {
        if (
          await setupNetwork(
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
          this.setWalletConnectingState(WalletConnectingState.COMPLETE);
        } else {
          this.logout();
        }
      })
      .catch(e => {
        this.setWalletConnectingState(WalletConnectingState.INIT);
        this.logger.error(`Moralis '${provider}' login error:`, e);
      });
  }

  logout() {
    Moralis.User.logOut()
      // Set user to undefined
      .then(() => this.userSubject.next(undefined))
      // Disconnect Web3 wallet
      .then(() => Moralis.Web3.cleanup())
      .catch(e => this.logger.error('Moralis logout error:', e))
      // Update wallet connecting state
      .finally(() => this.setWalletConnectingState(WalletConnectingState.INIT));
  }

  setWalletConnectingState(state: WalletConnectingState) {
    this.walletConnectingStateSubject.next(state);
  }
}
