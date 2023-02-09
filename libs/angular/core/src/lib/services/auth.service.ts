import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  EnvToken,
  ILoggerService,
  LoggerDehubToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  RequestMessageRequest,
  RequestMessageResponse,
  SupabaseJwt,
  SupabaseUser,
  VerifyMessageRequest,
  VerifyMessageResponse,
} from '@dehub/shared/model';
import { ethereumEnabled, getUserAddress } from '@dehub/shared/utils';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, firstValueFrom, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<SupabaseUser | undefined>(
    this.decodeUserFromJwt()
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

  async login() {
    const { signer, chain, address } = await this.connectToMetamask();
    this.logger.debug(`Address for login: ${address}`);

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

  async signOut() {
    this.logger.debug('Signing out.');
    localStorage.removeItem(SupabaseJwt);
  }

  private decodeUserFromJwt(token?: string): SupabaseUser | undefined {
    if (token) {
      try {
        const { exp, user } = jwt_decode<{ user: SupabaseUser; exp: number }>(
          token
        );

        // Check expiration
        if (Date.now() > +exp) {
          this.logger.warn(`JWT token has expired!`);
          localStorage.removeItem(SupabaseJwt);
        } else {
          return user;
        }
      } catch (error) {
        this.logger.error(`JWT decode error: ${JSON.stringify(error)}`);
      }
    }
    return undefined;
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
}
