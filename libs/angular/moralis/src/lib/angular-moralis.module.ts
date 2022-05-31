import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DehubMoralisToken, MoralisToken } from '@dehub/angular/model';
import { StartOptions } from '@dehub/shared/model';
import { Moralis } from 'moralis';
import { MessageService } from 'primeng/api';
import { DehubMoralisService, MoralisService } from './services';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [],
  exports: [],
})
export class AngularMoralisModule {
  static forRoot(
    options: StartOptions
  ): ModuleWithProviders<AngularMoralisModule> {
    /**
     * Initialize the SDK
     * Docs: https://docs.moralis.io/moralis-server/getting-started/connect-the-sdk#initialize-the-sdk
     **/
    const initializeMoralis = () =>
      Moralis.start(options).then(() =>
        console.info('Moralis has been initialized.')
      );

    return {
      ngModule: AngularMoralisModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: () => initializeMoralis,
          multi: true,
        },
        MessageService,
        { provide: MoralisToken, useClass: MoralisService },
        { provide: DehubMoralisToken, useClass: DehubMoralisService },
      ],
    };
  }
}
