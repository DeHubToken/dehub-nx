import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
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
import { MoralisService } from './services/moralis.service';

const primeNgModules = [
  ButtonModule,
  SplitButtonModule,
  RippleModule,
  DialogModule,
];

@NgModule({
  imports: [CommonModule, primeNgModules],
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
        MoralisService,
      ],
    };
  }
}
