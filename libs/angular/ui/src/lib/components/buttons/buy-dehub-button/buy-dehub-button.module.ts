import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BuyDehubButtonComponent } from './buy-dehub-button.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    // PrimeNg
    SplitButtonModule,
    BuyDehubButtonComponent,
  ],
  exports: [BuyDehubButtonComponent],
})
export class BuyDehubButtonModule {}
