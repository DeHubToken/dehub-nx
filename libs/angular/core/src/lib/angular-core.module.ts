import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ContentfulManagementToken,
  EnvToken,
  LoggerContentfulToken,
  LoggerDehubMoralisToken,
  LoggerDehubToken,
  LoggerMoralisToken,
  ScopeToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SwUpdateAvailableComponent } from './components/sw-update-available/sw-update-available.component';
import { ContentfulManagementService } from './services';
import { ConsoleLoggerService } from './services/logger.service';

export const provideDehubLoggerWithScope = (scope: string) => [
  { provide: ScopeToken, useValue: scope },
  {
    provide: LoggerDehubToken,
    useFactory: (scope: string, env: SharedEnv) =>
      new ConsoleLoggerService(scope, env),
    deps: [ScopeToken, EnvToken],
  },
];

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ToastModule,
    ButtonModule,

    // Rx Angular,
    LetModule,
    PushModule,
  ],
  declarations: [SwUpdateAvailableComponent],
  exports: [SwUpdateAvailableComponent, LetModule, PushModule],
})
export class AngularCoreModule {
  static forRoot(): ModuleWithProviders<AngularCoreModule> {
    return {
      ngModule: AngularCoreModule,
      providers: [
        MessageService,
        {
          provide: ContentfulManagementToken,
          useClass: ContentfulManagementService,
        },
        // Default Dehub Logger
        ...provideDehubLoggerWithScope(''),
        // Moralis Logger
        {
          provide: LoggerMoralisToken,
          useFactory: (env: SharedEnv) =>
            new ConsoleLoggerService('Moralis', env),
          deps: [EnvToken],
        },
        // Dehub Moralis Logger
        {
          provide: LoggerDehubMoralisToken,
          useFactory: (env: SharedEnv) =>
            new ConsoleLoggerService('Dehub Moralis', env),
          deps: [EnvToken],
        },
        // Contentful Logger
        {
          provide: LoggerContentfulToken,
          useFactory: (env: SharedEnv) =>
            new ConsoleLoggerService('Contentful', env),
          deps: [EnvToken],
        },
      ],
    };
  }
}
