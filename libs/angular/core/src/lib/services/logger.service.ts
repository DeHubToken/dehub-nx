import { Inject, Injectable } from '@angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { EnvToken } from '../models';

export interface LoggerService {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string, error?: Error) => void;
}

/**
 * Simple Console Logger Service
 */
@Injectable()
export class ConsoleLoggerService implements LoggerService {
  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  info(message: string) {
    if (this.env.env === 'dev') console.info(message);
  }

  warn(message: string) {
    console.warn(message);
  }

  error(message: string, error?: Error) {
    console.error(message, error);
  }
}
