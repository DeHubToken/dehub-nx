import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  EnvToken,
  IDehubMoralisService,
  ILoggerService,
  IMoralisService,
  LoggerDehubMoralisToken,
  MoralisToken,
} from '@dehub/angular/model';
import { Networks, SharedEnv } from '@dehub/shared/config';
import {
  CheckOrderParams,
  CheckOrderResponse,
  Currency,
  DeHubShopShippingAddress,
  InitOrderParams,
  InitOrderResponse,
  MoralisClass,
  MoralisFunctions,
  ShopContractPropsType,
  ShopContractResponse,
} from '@dehub/shared/model';
import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import {
  filterEmpty,
  getContractByCurrency,
  publishReplayRefCount,
} from '@dehub/shared/utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { Moralis } from 'moralis';
import { MessageService } from 'primeng/api';
import {
  concatMap,
  filter,
  from,
  iif,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Injectable()
export class DehubMoralisService implements IDehubMoralisService {
  canPlay$ = this.moralisService.userAttributes$.pipe(
    map(attributes => attributes?.can_play ?? false)
  );

  userContacts$ = this.moralisService.userAttributes$.pipe(
    filterEmpty(),
    map(({ email, phone }) => ({ email, phone }))
  );

  /** For now, we're just going to use the first address. */
  userShippingAddress$ = this.moralisService.isAuthenticated$.pipe(
    filter(isAuthenticated => isAuthenticated),
    switchMap(() =>
      this.getDeHubShopShippingAddresses$().pipe(
        filterNil(),
        map(addresses => addresses[0])
      )
    )
  );

  checkoutContract$ = this.getCheckoutContract$().pipe(publishReplayRefCount());

  constructor(
    @Inject(LoggerDehubMoralisToken) private logger: ILoggerService,
    @Inject(MoralisToken) private moralisService: IMoralisService,
    @Inject(EnvToken) private env: SharedEnv,
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}

  /**
   * Gets a list of all shipping addresses associated with the current user.
   */
  getDeHubShopShippingAddresses$() {
    const ShippingAddress = Moralis.Object.extend(
      MoralisClass.DeHubShopShippingAddresses
    );
    const query = new Moralis.Query<DeHubShopShippingAddress>(ShippingAddress);

    return from(query.find()).pipe(
      map(result => (result.length ? result : undefined))
    );
  }

  /**
   * Gets a balance of the wallet based on the currency passed. If currency is
   * native to the current network, then getNativeBalance is used.
   * And if currency is ERC20 token getTokenBalances is used and filtered.
   * @param currency BNB, DeHub etc.
   * @param address Target wallet
   * @returns Balance and decimals
   */
  getWalletBalance$(
    currency: Currency,
    address: string
  ): Observable<BigNumber> {
    const chain = decimalToHex(this.env.web3.chainId);
    const { nativeCurrency } = Networks[this.env.web3.chainId];

    return iif(
      () => currency === nativeCurrency.name,
      this.moralisService.getNativeBalance$({
        chain,
        address,
      }),
      this.moralisService
        .getTokenBalances$({
          chain,
          address,
        })
        .pipe(
          map(
            balances =>
              balances.find(
                resp =>
                  getAddress(resp.token_address) ===
                  getContractByCurrency(
                    currency,
                    this.env.web3.addresses.contracts
                  )
              ) || { balance: '0', symbol: '-' }
          ),
          tap(({ balance, symbol }) =>
            this.logger.info(`${symbol} balance found: ${balance.toString()}`)
          )
        )
    ).pipe(map(({ balance }) => BigNumber.from(balance)));
  }

  /**
   * Gets balance of the wallet for a specific token(native or ERC20) and checks
   * if it has enough.
   */
  hasEnoughBalance$(currency: Currency, address: string, amount: BigNumber) {
    return this.getWalletBalance$(currency, address).pipe(
      map(balance => {
        if (balance.gte(amount)) {
          return true;
        } else {
          const summary = `You don't have enough ${currency} balance.`;
          this.messageService.add({
            severity: 'error',
            summary,
            detail: 'Please, top up your wallet.',
            closable: true,
          });
          return false;
        }
      })
    );
  }

  /**
   * Calls the DeHub API to initialize an order, which in turn uploads a picture
   * file to IPFS and creates a new order object on Moralis DB.
   * @returns ipfsHash, orderId
   */
  initOrder$(params: InitOrderParams) {
    const url = this.moralisService.getCloudFunctionUrl(
      MoralisFunctions.Shop.InitOrder
    );
    this.logger.info('Sending initOrder request to Moralis...', params);
    return this.httpClient.post<InitOrderResponse>(url, params).pipe(
      tap(resp => this.logger.info(JSON.stringify(resp))),
      map(resp => resp.result)
    );
  }

  checkOrder$(params: CheckOrderParams) {
    const url = this.moralisService.getCloudFunctionUrl(
      MoralisFunctions.Shop.CheckOrder
    );
    this.logger.info(`Checking order ${params.orderId} status...`);
    let data = new HttpParams();
    data = params.orderId ? data.set('orderId', params.orderId) : data;
    return this.httpClient.get<CheckOrderResponse>(url, { params: data }).pipe(
      tap(resp => this.logger.info(JSON.stringify(resp))),
      map(resp => resp.result)
    );
  }

  /**
   * Get Checkout contract data from Moralis DB via API.
   */
  getCheckoutContract$() {
    const url = this.moralisService.getCloudFunctionUrl(
      MoralisFunctions.Shop.GetCheckoutContract
    );
    return this.httpClient
      .get<ShopContractResponse>(url)
      .pipe(map(resp => resp.result));
  }

  /**
   * Attempt to execute Receipt NFT minting function directly on the blockchain.
   * Use "currency" string to interpolate the correct function.
   * Handles Native and ERC20 types of purchase.
   * @param orderId id of the order initialized and monitored on Moralis DB.
   * @param ipfsHash hash of the data related to this order which will be used in minting.
   * @param checkoutContract minting contract data from Moralis DB.
   * @param currency DeHub, BNB, BUSD, etc.
   * @param price non-decimal number
   * @param quantity non-decimal number
   * @returns awaits until the transaction is mined and returns tx receipt object.
   */
  mintReceipt$(
    orderId: string,
    ipfsHash: string,
    checkoutContract: ShopContractPropsType,
    currency: Currency,
    price: BigNumber,
    quantity: BigNumber
  ) {
    const { nativeCurrency } = Networks[this.env.web3.chainId];
    let params: Moralis.ExecuteFunctionParams = {
      _quantity: quantity.toString(),
      _totalAmount: price.toString(),
      _orderId: orderId,
      _metadataURI: ipfsHash,
    };
    let options: Moralis.ExecuteFunctionOptions = {
      contractAddress: checkoutContract.address,
      abi: checkoutContract.abi,
      functionName: `purchaseBy${currency}`,
      params,
    };
    // If native send native tokens with msgValue...
    // TODO: need to test this!
    if (currency === nativeCurrency.name) {
      options = { ...options, msgValue: price.toString() };
    } else {
      // ...otherwise pass _priceIn[currency] and the contract will transfer the tokens
      params = { ...params, [`_priceIn${currency}`]: price.toString() };
      options = { ...options, params };
    }

    return from(
      Moralis.executeFunction(
        options
      ) as unknown as Observable<TransactionResponse>
    ).pipe(concatMap((tx: TransactionResponse) => tx.wait()));
  }
}
