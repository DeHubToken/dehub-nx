import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { WalletButtonComponent } from './wallet-button.component';

@NgModule({
  declarations: [WalletButtonComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,
    SharedModule,
  ],
  exports: [WalletButtonComponent],
})
export class WalletButtonModule {}
