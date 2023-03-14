import { Inject, Injectable } from '@angular/core';
import { EnvToken, ILoggerService, ScopeToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/model';

/**
 * Simple Console Logger Service
 */
@Injectable()
export class ConsoleLoggerService implements ILoggerService {
  constructor(
    @Inject(ScopeToken) private scope: string,
    @Inject(EnvToken) private env: SharedEnv
  ) {}

  debug(message: string, ...optionalParams: unknown[]) {
    if (this.env.env === 'dev')
      console.debug(
        this.messageWithScope(message),
        'color:92,134,246',
        '',
        ...optionalParams
      );
  }

  info(message: string, ...optionalParams: unknown[]) {
    if (this.env.env === 'dev')
      console.info(
        this.messageWithScope(message),
        'color:grey',
        '',
        ...optionalParams
      );
  }

  warn(message: string, ...optionalParams: unknown[]) {
    console.warn(
      this.messageWithScope(message),
      'color:orange',
      '',
      ...optionalParams
    );
  }

  error(message: string, error?: Error) {
    console.error(this.messageWithScope(message), 'color:red', '', error);
  }

  private messageWithScope(message: string) {
    return `%c[DeHub]${this.scope ? `(${this.scope})` : ''} %c${message}`;
  }
}
