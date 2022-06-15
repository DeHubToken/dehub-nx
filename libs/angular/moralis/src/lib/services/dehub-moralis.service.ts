import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  EnvToken,
  IDehubMoralisService,
  ILoggerService,
  IMoralisService,
  LoggerToken,
  MoralisToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  DeHubShopShippingAddresses,
  InitOrderParams,
  InitOrderResponse,
} from '@dehub/shared/model';
import { Moralis } from 'moralis';
import { from, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DehubMoralisService implements IDehubMoralisService {
  canPlay$ = this.moralisService.userAttributes$.pipe(
    map(attributes => attributes?.can_play ?? false)
  );

  // For now, we're just going to use the first address.
  userShippingAddress$ = this.getDeHubShopShippingAddresses().pipe(
    map(resp => resp[0])
  );

  constructor(
    @Inject(LoggerToken) private _logger: ILoggerService,
    @Inject(MoralisToken) private moralisService: IMoralisService,
    @Inject(EnvToken) private env: SharedEnv,
    private httpClient: HttpClient
  ) {}

  getDeHubShopShippingAddresses() {
    const ShippingAddress = Moralis.Object.extend('DeHubShopShippingAddresses');
    const query = new Moralis.Query(ShippingAddress);
    const result = query.find();
    return from(result) as unknown as Observable<DeHubShopShippingAddresses[]>;
  }

  /**
   * Calls the DeHub API to initialize an order, which in turn uploads a picture
   * file to IPFS and creates a new order object on Moralis DB.
   * @returns ipfsHash, orderId
   */
  initOrder(params: InitOrderParams) {
    const url = this.env.moralis.serverUrl + '/functions/initOrder';
    // Request
    this._logger.info('Sending initOrder request to Moralis...');
    this._logger.info(`  params: `, params);
    return this.httpClient
      .post<InitOrderResponse>(url, params)
      .pipe(tap(resp => this._logger.info(JSON.stringify(resp))));
  }
}
