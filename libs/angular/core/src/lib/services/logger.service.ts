import { Inject, Injectable } from '@angular/core';
import { EnvToken, ILoggerService } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';

/**
 * Simple Console Logger Service
 */
@Injectable()
export class ConsoleLoggerService implements ILoggerService {
  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  info(message: string, ...optionalParams: unknown[]) {
    if (this.env.env === 'dev') console.info(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]) {
    console.warn(message, ...optionalParams);
  }

  error(message: string, error?: Error) {
    console.error(message, error);
  }
}
