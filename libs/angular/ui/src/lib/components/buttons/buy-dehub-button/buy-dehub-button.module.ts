import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BuyDehubButtonComponent } from './buy-dehub-button.component';

@NgModule({
  declarations: [BuyDehubButtonComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    SplitButtonModule,
  ],
  exports: [BuyDehubButtonComponent],
})
export class BuyDehubButtonModule {}
