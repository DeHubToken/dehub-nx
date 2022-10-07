import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WalletButtonComponent } from './wallet-button.component';

@NgModule({
  declarations: [WalletButtonComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
  ],
  exports: [WalletButtonComponent],
})
export class WalletButtonModule {}
