import { Inject, Injectable } from '@angular/core';
import {
  EnvToken,
  ILoggerService,
  LoggerContentfulToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { createClient, PlainClientAPI } from 'contentful-management';

@Injectable({ providedIn: 'root' })
export class ContentfulManagementService {
  client: PlainClientAPI;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(LoggerContentfulToken) private logger: ILoggerService
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
          else logger.info('data', level, data);
        },
        requestLogger: (request: AxiosRequestConfig | Error) => {
          if (request instanceof Error) logger.error('request', request);
          else logger.info('request', request.url);
        },
        responseLogger: (response: AxiosResponse<unknown> | Error) => {
          if (response instanceof Error) logger.error('response', response);
          else logger.info('response', response.data);
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
    // console.log('client', this.client);
  }

  initClient() {}

  async getEntries() {
    await this.client.entry.getMany({
      query: {
        skip: 10,
        limit: 100,
      },
    });
    // console.log('entries', entries);
  }
}
