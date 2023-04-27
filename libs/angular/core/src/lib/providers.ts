import { EnvToken, ScopeToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/model';

import { LoggerDehubToken } from '@dehub/angular/model';
import { ConsoleLoggerService } from './services';

export const provideDehubLoggerWithScope = (scope: string) => [
  { provide: ScopeToken, useValue: scope },
  {
    provide: LoggerDehubToken,
    useFactory: (scope: string, env: SharedEnv) =>
      new ConsoleLoggerService(scope, env),
    deps: [ScopeToken, EnvToken],
  },
];
