import { InjectionToken } from '@angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  IDehubMoralisService,
  ILoggerService,
  IMoralisService,
} from './service-api.model';

/** Token for providing shared environment */
export const EnvToken = new InjectionToken<SharedEnv>('Environment');

/** Token for providing scope */
export const ScopeToken = new InjectionToken<string>('Scope');

// Logger tokens

/** Token for providing Logger for Dehub */
export const LoggerDehubToken = new InjectionToken<ILoggerService>(
  'Logger for DeHub'
);

/** Token for providing Logger for Moralis */
export const LoggerMoralisToken = new InjectionToken<ILoggerService>(
  'Logger for Moralis'
);

/** Token for providing Logger for Dehub Moralis */
export const LoggerDehubMoralisToken = new InjectionToken<ILoggerService>(
  'Logger for Dehub Moralis'
);

/** Token for providing Logger for Contentful */
export const LoggerContentfulToken = new InjectionToken<ILoggerService>(
  'Logger for Contentful'
);

// Service Tokens

/** Token for providing Moralis Service */
export const MoralisToken = new InjectionToken<IMoralisService>(
  'Moralis Service'
);

/** Token for providing Dehub Moralis Service */
export const DehubMoralisToken = new InjectionToken<IDehubMoralisService>(
  'Dehub Moralis Service'
);
