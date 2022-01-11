import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Moralis } from 'moralis';
import { StartOptions } from './models/moralis.models';

@NgModule({
  imports: [CommonModule],
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
        console.info('Moralis has been initialised.')
      );

    return {
      ngModule: AngularMoralisModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: () => initializeMoralis,
          multi: true,
        },
      ],
    };
  }
}
