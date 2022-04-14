import { InjectionToken } from '@angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  IDehubMoralisService,
  ILoggerService,
  IMoralisService,
} from './service-api.model';

/** Token for providing shared environment */
export const EnvToken = new InjectionToken<SharedEnv>('Environment');

/** Token for providing Logger Service */
export const LoggerToken = new InjectionToken<ILoggerService>('Logger Service');

/** Token for providing Moralis Service */
export const MoralisToken = new InjectionToken<IMoralisService>(
  'Moralis Service'
);

/** Token for providing Dehub Moralis Service */
export const DehubMoralisToken = new InjectionToken<IDehubMoralisService>(
  'Dehub Moralis Service'
);
