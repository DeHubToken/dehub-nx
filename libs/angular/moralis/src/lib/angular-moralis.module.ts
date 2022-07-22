import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DehubMoralisToken,
  ILoggerService,
  LoggerMoralisToken,
  MoralisToken,
} from '@dehub/angular/model';
import { StartOptions } from '@dehub/shared/model';
import { Moralis } from 'moralis';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DehubMoralisService, MoralisService } from './services';

@NgModule({
  imports: [
    // Angular
    ReactiveFormsModule,
  ],
  declarations: [],
  exports: [],
})
export class AngularMoralisModule {
  static forRoot(
    options: StartOptions
  ): ModuleWithProviders<AngularMoralisModule> {
    return {
      ngModule: AngularMoralisModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (logger: ILoggerService) => () =>
            /**
             * Initialize the SDK
             * Docs: https://docs.moralis.io/moralis-server/getting-started/connect-the-sdk#initialize-the-sdk
             **/
            Moralis.start(options).then(() =>
              logger.info('Moralis has been initialized.')
            ),
          multi: true,
          deps: [LoggerMoralisToken],
        },
        MessageService,
        ConfirmationService,
        { provide: MoralisToken, useClass: MoralisService },
        { provide: DehubMoralisToken, useClass: DehubMoralisService },
      ],
    };
  }
}
