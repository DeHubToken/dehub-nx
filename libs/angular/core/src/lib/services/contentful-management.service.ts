import { Inject, Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client';
import {
  ApolloCacheToken,
  EnvToken,
  IContentFulManagementService,
  ILoggerService,
  LoggerContentfulToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  ProductAvailableQuantityFragment,
  ProductAvailableQuantityFragmentDoc,
} from '@dehub/shared/model';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  createClient,
  EntryProps,
  KeyValueMap,
  PlainClientAPI,
} from 'contentful-management';

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
          else logger.info('logHandler', level, data);
        },
        requestLogger: (request: AxiosRequestConfig | Error) => {
          if (request instanceof Error) logger.error('request', request);
          else logger.info('requestLogger', `${request.method} ${request.url}`);
        },
        responseLogger: (response: AxiosResponse<unknown> | Error) => {
          if (response instanceof Error) logger.error('response', response);
          else logger.info('responseLogger', response.data);
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

  async reduceProductAvailableQuantity(productId: string, quantity: number) {
    const product = await this.client.entry.get({
      entryId: productId,
    });
    const productInfo = (product: EntryProps<KeyValueMap>) =>
      `Product '${product.fields.name['en-US']}' (${product.sys.id})`;
    const availableQuantity = +product.fields.availableQuantity['en-US'];

    if (availableQuantity >= quantity) {
      const newQuantity = availableQuantity - quantity;
      product.fields.availableQuantity['en-US'] = newQuantity;

      this.logger.info(
        `${productInfo(
          product
        )} quantity change from ${availableQuantity} to ${newQuantity} (-${quantity}).`
      );
      // Update Contentful
      return await this.client.entry
        .update({ entryId: product.sys.id }, product)
        .then(product => {
          this.logger.info(
            `${productInfo(product)} quantity update was successful.`
          );
        })
        // Update Apollo Cache
        .then(() =>
          this.cache.updateFragment<ProductAvailableQuantityFragment>(
            {
              id: 'Product:3W7SZpxFpkBmul9I16xDXM',
              fragment: ProductAvailableQuantityFragmentDoc,
            },
            _data => ({ availableQuantity: newQuantity })
          )
        )
        .then(updateResult => {
          this.logger.info(
            `${productId} availableQuantity '${updateResult?.availableQuantity}' CACHE update was successful.`
          );
          return updateResult;
        })
        .catch(error => {
          this.logger.error(
            `${productInfo(product)} quantity update failed.`,
            error
          );
          return Promise.resolve({ availableQuantity });
        });
    } else {
      this.logger.error(`${productInfo(product)} quantity is too low.`);
    }
    return Promise.resolve({ availableQuantity });
  }
}
