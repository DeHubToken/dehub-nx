import { Injectable } from '@angular/core';
import { ICoingeckoService } from '@dehub/angular/model';
import { getDehubUsdPrice } from '@dehub/shared/utils';
import { from, switchMap, timer } from 'rxjs';

/**
 * Coingecko API
 * Docs: https://www.coingecko.com/en/api/documentation
 */
@Injectable({ providedIn: 'root' })
export class CoingeckoService implements ICoingeckoService {
  /** https://apiguide.coingecko.com/getting-started/error-and-rate-limit#rate-limit (10-30/min) */
  private rateLimit = (1000 * 60) / 5;

  getDehubUsdPricePoll$ = () =>
    timer(0, this.rateLimit).pipe(switchMap(() => from(getDehubUsdPrice())));
}
