import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WalletButtonComponent } from './wallet-button.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    WalletButtonComponent,
  ],
  exports: [WalletButtonComponent],
})
export class WalletButtonModule {}
