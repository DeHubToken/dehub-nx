import { HttpClient, HttpParams } from '@angular/common/http';
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
  CheckOrderParams,
  CheckOrderResponse,
  Currency,
  DeHubShopShippingAddresses,
  InitOrderParams,
  InitOrderResponse,
  MoralisClass,
  ShopContractPropsType,
  ShopContractResponse,
} from '@dehub/shared/model';
import { publishReplayRefCount } from '@dehub/shared/utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { Moralis } from 'moralis';
import { concatMap, from, Observable, switchMap, tap } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class DehubMoralisService implements IDehubMoralisService {
  canPlay$ = this.moralisService.userAttributes$.pipe(
    map(attributes => attributes?.can_play ?? false)
  );

  // For now, we're just going to use the first address.
  userShippingAddress$ = this.moralisService.isAuthenticated$.pipe(
    filter(isAuthenticated => isAuthenticated),
    switchMap(() =>
      this.getDeHubShopShippingAddresses$().pipe(map(resp => resp[0]))
    )
  );

  checkoutContract$ = this.getCheckoutContract$().pipe(publishReplayRefCount());

  constructor(
    @Inject(LoggerToken) private _logger: ILoggerService,
    @Inject(MoralisToken) private moralisService: IMoralisService,
    @Inject(EnvToken) private env: SharedEnv,
    private httpClient: HttpClient
  ) {}

  getDeHubShopShippingAddresses$() {
    const ShippingAddress = Moralis.Object.extend(
      MoralisClass.DeHubShopShippingAddresses
    );
    const query = new Moralis.Query(ShippingAddress);
    const result = query.find();
    return from(result) as unknown as Observable<DeHubShopShippingAddresses[]>;
  }

  /**
   * Calls the DeHub API to initialize an order, which in turn uploads a picture
   * file to IPFS and creates a new order object on Moralis DB.
   * @returns ipfsHash, orderId
   */
  initOrder$(params: InitOrderParams) {
    const url = this.env.moralis.serverUrl + '/functions/initOrder';
    this._logger.info('Sending initOrder request to Moralis...');
    this._logger.info(`  params: `, params);
    return this.httpClient.post<InitOrderResponse>(url, params).pipe(
      tap(resp => this._logger.info(JSON.stringify(resp))),
      map(resp => resp.result)
    );
  }

  checkOrder$(params: CheckOrderParams) {
    const url = this.env.moralis.serverUrl + '/functions/checkOrder';
    this._logger.info(`Checking order ${params.orderId} status...`);
    let data = new HttpParams();
    data = params.orderId ? data.set('orderId', params.orderId) : data;
    return this.httpClient.get<CheckOrderResponse>(url, { params: data }).pipe(
      tap(resp => this._logger.info(JSON.stringify(resp))),
      map(resp => resp.result)
    );
  }

  /**
   * Get Checkout contract data from Moralis DB via API.
   */
  getCheckoutContract$() {
    const url = this.env.moralis.serverUrl + '/functions/getCheckoutContract';
    return this.httpClient
      .get<ShopContractResponse>(url)
      .pipe(map(resp => resp.result));
  }

  mintReceipt$(
    orderId: string,
    ipfsHash: string,
    checkoutContract: ShopContractPropsType,
    currency: Currency,
    price: BigNumber
  ) {
    const options: Moralis.ExecuteFunctionOptions = {
      contractAddress: checkoutContract.address,
      abi: checkoutContract.abi,
      functionName: `purchaseBy${currency}`,
      params: {
        [`_priceIn${currency}`]: price.toString(),
        _orderId: orderId,
        _metadataURI: ipfsHash,
      },
    };
    return from(
      Moralis.executeFunction(
        options
      ) as unknown as Observable<TransactionResponse>
    ).pipe(concatMap((tx: TransactionResponse) => tx.wait()));
  }
}
