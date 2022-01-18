import { InjectionToken } from '@angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { LoggerService } from '../services';

/** Token for providing shared environment */
export const EnvToken = new InjectionToken<SharedEnv>('Environment');

/** Token for provideing Logger Service */
export const LoggerToken = new InjectionToken<LoggerService>('Logger Service');
