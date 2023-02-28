import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  EnvToken,
  ILoggerService,
  LoggerDehubToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  AuthenticateRequest,
  AuthenticateResponse,
  RequestMessageRequest,
  RequestMessageResponse,
  SupabaseJwt,
  SupabaseUser,
  VerifyMessageRequest,
  VerifyMessageResponse,
} from '@dehub/shared/model';
import {
  ethereumEnabled,
  getUserAddress,
  shortenAddress,
} from '@dehub/shared/utils';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BehaviorSubject, firstValueFrom, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<SupabaseUser | undefined>(
    undefined
  );

  user$ = this.userSubject.asObservable().pipe(
    tap(loggedInUser => {
      this.logger.debug(
        `Current user:`,
        loggedInUser ? getUserAddress(loggedInUser) : undefined
      );
    })
  );

  isAuthenticated$ = this.user$.pipe(map(user => !!user));

  constructor(
    @Inject(EnvToken) private readonly env: SharedEnv,
    @Inject(LoggerDehubToken) private logger: ILoggerService,
    private httpClient: HttpClient
  ) {}

  async auth() {
    const token = localStorage.getItem(SupabaseJwt);
    if (token) {
      this.logger.debug(`Authenticate from JWT...`);

      return await this.authenticate({ token })
        .then(({ user }) => this.userSubject.next(user))
        .catch(e => {
          if (e instanceof HttpErrorResponse)
            this.logger.error(`Authentication failed: ${e.error.error}`);
          else this.logger.error(`Unexpected Authentication issue`, e);

          this.signOut();
        });
    }
  }

  async login() {
    const { signer, chain, address } = await this.connectToMetamask();
    this.logger.debug(`Login from Metamask: ${shortenAddress(address)}`);

    if (!address) throw new Error('No account found in Metamask');
    if (!chain) throw new Error('No chain found in Metamask');

    const networkType = 'evm';
    const { message } = await this.requestMessage({
      address,
      chain,
      networkType,
    });

    const signature = await signer.signMessage(message);
    const { user, token } = await this.verifyMessage({
      message,
      signature,
      networkType,
    });

    this.userSubject.next(user);

    localStorage.setItem(SupabaseJwt, token);
  }

  signOut() {
    this.logger.debug('Signing out.');
    localStorage.removeItem(SupabaseJwt);
  }

  private async connectToMetamask(): Promise<{
    signer: JsonRpcSigner;
    chain: string;
    address: string;
  }> {
    const provider = new Web3Provider(ethereumEnabled());

    const [accounts, chainId] = await Promise.all([
      provider.send('eth_requestAccounts', []),
      provider.send('eth_chainId', []),
    ]);

    const signer = provider.getSigner();
    return { signer, chain: chainId, address: accounts[0] };
  }

  private async requestMessage(payload: RequestMessageRequest) {
    return firstValueFrom(
      this.httpClient.post<RequestMessageResponse>(
        `${this.env.api}/auth/request-message`,
        payload
      )
    );
  }

  private async verifyMessage(payload: VerifyMessageRequest) {
    return firstValueFrom(
      this.httpClient.post<VerifyMessageResponse>(
        `${this.env.api}/auth/verify-message`,
        payload
      )
    );
  }

  private async authenticate(payload: AuthenticateRequest) {
    return firstValueFrom(
      this.httpClient.post<AuthenticateResponse>(
        `${this.env.api}/auth/authenticate`,
        payload
      )
    );
  }
}
