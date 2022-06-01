import { Inject, Injectable } from '@angular/core';
import {
  IDehubMoralisService,
  ILoggerService,
  IMoralisService,
  LoggerToken,
  MoralisToken,
} from '@dehub/angular/model';
import { DeHubShopShippingAddresses } from '@dehub/shared/model';
import { Moralis } from 'moralis';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DehubMoralisService implements IDehubMoralisService {
  canPlay$ = this.moralisService.userAttributes$.pipe(
    map(attributes => attributes?.can_play ?? false)
  );

  // For now, we're just going to use the first address.
  myShippingAddress$ = this.getDeHubShopShippingAddresses().pipe(
    map(resp => resp[0])
  );

  constructor(
    @Inject(LoggerToken) private _logger: ILoggerService,
    @Inject(MoralisToken) private moralisService: IMoralisService
  ) {}

  getDeHubShopShippingAddresses() {
    const ShippingAddress = Moralis.Object.extend('DeHubShopShippingAddresses');
    const query = new Moralis.Query(ShippingAddress);
    const result = query.find();
    return from(result) as unknown as Observable<DeHubShopShippingAddresses[]>;
  }
}
