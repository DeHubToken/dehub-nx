import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { WalletButtonComponent } from './wallet-button.component';

@NgModule({
  declarations: [WalletButtonComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,
  ],
  exports: [WalletButtonComponent],
})
export class WalletButtonModule {}
