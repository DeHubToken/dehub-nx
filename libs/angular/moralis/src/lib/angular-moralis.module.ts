import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LoaderModule } from '@dehub/angular/ui/components/loader';
import { Moralis } from 'moralis';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import {
  ConnectWalletButtonComponent,
  ConnectWalletComponent,
  ConnectWalletDialogComponent,
} from './components/connect-wallet';
import { StartOptions } from './models/moralis.models';
import { DehubMoralisService, MoralisService } from './services';

const primeNgModules = [
  ButtonModule,
  SplitButtonModule,
  RippleModule,
  DialogModule,
];

const libModules = [LoaderModule];

@NgModule({
  imports: [CommonModule, primeNgModules, libModules],
  declarations: [
    ConnectWalletComponent,
    ConnectWalletButtonComponent,
    ConnectWalletDialogComponent,
  ],
  exports: [ConnectWalletComponent],
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
        MoralisService,
        DehubMoralisService,
      ],
    };
  }
}
