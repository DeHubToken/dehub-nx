import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConnectWalletButtonComponent } from './connect-wallet-button.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // PrimeNG
    ButtonModule,
    SplitButtonModule,
    ConnectWalletButtonComponent,
  ],
  exports: [ConnectWalletButtonComponent],
})
export class ConnectWalletButtonModule {}
