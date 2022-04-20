import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DehubMoralisToken, MoralisToken } from '@dehub/angular/model';
import { LoaderModule } from '@dehub/angular/ui/components/loader';
import { StartOptions } from '@dehub/shared/model';
import { Moralis } from 'moralis';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import {
  ConnectWalletButtonComponent,
  ConnectWalletComponent,
  ConnectWalletDialogComponent,
} from './components/connect-wallet';
import { DehubMoralisService, MoralisService } from './services';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,

    // PrimeNg
    ButtonModule,
    SplitButtonModule,
    RippleModule,
    DialogModule,
    InplaceModule,
    InputTextModule,

    // Libs
    LoaderModule,
  ],
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
        { provide: MoralisToken, useClass: MoralisService },
        { provide: DehubMoralisToken, useClass: DehubMoralisService },
      ],
    };
  }
}
