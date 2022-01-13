import { Injectable } from '@angular/core';
import { ProviderTypes } from '@dehub/shared/moralis';
import { Moralis } from 'moralis';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { User } from '../models/moralis.models';

@Injectable(/* { providedIn: AngularMoralisModule.forRoot() } */)
export class MoralisService {
  private userSubject = new BehaviorSubject<User | undefined>(
    Moralis.User.current()
  );

  /** Current Moralis user */
  user$ = this.userSubject.asObservable().pipe(
    tap(loggedInUser =>
      console.info(`Current user: ${loggedInUser?.attributes.username}`)
    ),
    share({
      connector: () => new ReplaySubject(1),
      resetOnError: false,
      resetOnComplete: false,
      resetOnRefCountZero: false,
    })
  );

  userLoggedIn$ = this.user$.pipe(map(user => !!user));

  constructor() {}

  login(provider: ProviderTypes) {
    const signingMessage = 'DeHub Dapp';

    (provider === 'metamask'
      ? Moralis.Web3.authenticate({ signingMessage })
      : Moralis.Web3.authenticate({ signingMessage, provider })
    )
      .then(loggedInUser => this.userSubject.next(loggedInUser))
      .catch(e => console.error(`Moralis '${provider}' login error:`, e));
  }

  logout() {
    Moralis.User.logOut()
      // Set user to undefined
      .then(() => this.userSubject.next(undefined))
      // Disconnect Web3 wallet
      .then(() => Moralis.Web3.cleanup())
      .catch(e => console.error('Moralis logout error:', e));
  }
}
