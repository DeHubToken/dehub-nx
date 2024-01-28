import { Inject, Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client';
import {
  ApolloCacheToken,
  EnvToken,
  IContentFulManagementService,
  ILoggerService,
  LoggerContentfulToken,
} from '@dehub/angular/model';
import {
  ProductAvailableQuantityFragment,
  ProductAvailableQuantityFragmentDoc,
  SharedEnv,
} from '@dehub/shared/model';
import { isContentfulEntityChanged } from '@dehub/shared/utils';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  createClient,
  EntryProps,
  KeyValueMap,
  PlainClientAPI,
} from 'contentful-management';

import {
  catchError,
  concatMap,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

/**
 * Contentful Management Plain API
 * Docs: https://github.com/contentful/contentful-management.js#alternative-plain-api
 */
@Injectable({ providedIn: 'root' })
export class ContentfulManagementService
  implements IContentFulManagementService
{
  client: PlainClientAPI;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(LoggerContentfulToken) private logger: ILoggerService,
    @Inject(ApolloCacheToken) private cache: InMemoryCache
  ) {
    const {
      cmaToken: accessToken,
      spaceId,
      environmentId,
    } = env.contentful.website;

    this.client = createClient(
      {
        accessToken,
        logHandler: (level: string, data?: Error | string) => {
          if (data instanceof Error) logger.error(`${level}`, data);
          else logger.debug('logHandler', level, data);
        },
        requestLogger: (request: AxiosRequestConfig | Error) => {
          if (request instanceof Error) logger.error('request', request);
          else
            logger.debug('requestLogger', `${request.method} ${request.url}`);
        },
        responseLogger: (response: AxiosResponse<unknown> | Error) => {
          if (response instanceof Error) logger.error('response', response);
          else logger.debug('responseLogger', response.data);
        },
      },
      {
        type: 'plain',
        defaults: {
          spaceId,
          environmentId,
        },
      }
    );
  }

  reduceProductAvailableQuantity$(
    productId: string,
    quantity: number
  ): Observable<ProductAvailableQuantityFragment | null> {
    const productInfo = (product: EntryProps<KeyValueMap>) =>
      `Product '${product.fields.name['en-US']}' (${product.sys.id})`;

    // Read product from Contentful
    return from(this.client.entry.get({ entryId: productId })).pipe(
      // Check and calculate new quantity
      concatMap(product => {
        const availableQuantity = +product.fields.availableQuantity['en-US'];
        const hasAvailableQuantity = availableQuantity >= quantity;
        const msg = `Insufficient available quantity (${availableQuantity} vs ${quantity})!`;

        if (hasAvailableQuantity) {
          const newQuantity = availableQuantity - quantity;
          product.fields.availableQuantity['en-US'] = newQuantity;

          this.logger.info(
            `Available quantity change request for ${productInfo(
              product
            )} (${availableQuantity} - ${quantity} = ${newQuantity}).`
          );

          return of(product);
        } else {
          this.logger.warn(msg);
          return throwError(() => new Error(msg));
        }
      }),

      // 1. Update Contentful
      switchMap(product =>
        from(
          this.client.entry.update({ entryId: product.sys.id }, product)
        ).pipe(
          tap(product =>
            this.logger.debug(
              `Available quantity update was successful for ${productInfo(
                product
              )}.`
            )
          ),
          catchError(error =>
            throwError(() => {
              const msg = `Available quantity update failed for ${productInfo(
                product
              )}.`;
              this.logger.error(msg, error);
              return new Error(msg);
            })
          )
        )
      ),
      // 2. Publish Contentful (update has changed the status from published to changed)
      switchMap(product =>
        isContentfulEntityChanged(product)
          ? from(
              this.client.entry.publish({ entryId: product.sys.id }, product)
            ).pipe(
              tap(product =>
                this.logger.debug(
                  `Available quantity publish was successful for ${productInfo(
                    product
                  )}.`
                )
              ),
              catchError(error =>
                throwError(() => {
                  const msg = `Available quantity publish failed for ${productInfo(
                    product
                  )}.`;
                  this.logger.error(msg, error);
                  return new Error(msg);
                })
              )
            )
          : of(product)
      ),

      // Update Apollo Cache
      map(product =>
        this.cache.updateFragment<ProductAvailableQuantityFragment>(
          {
            id: `Product:${productId}`,
            fragment: ProductAvailableQuantityFragmentDoc,
          },
          _data => ({
            availableQuantity: product.fields.availableQuantity['en-US'],
          })
        )
      ),
      tap(updateResult => {
        this.logger.debug(
          `Available quantity cache update (${updateResult?.availableQuantity}) was successful for ${productId}.`
        );
      })
    );
  }
}
