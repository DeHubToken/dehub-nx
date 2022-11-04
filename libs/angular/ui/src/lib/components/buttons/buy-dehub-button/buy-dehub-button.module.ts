import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BuyDehubButtonComponent } from './buy-dehub-button.component';

@NgModule({
  declarations: [BuyDehubButtonComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    SplitButtonModule,
    ButtonModule,
  ],
  exports: [BuyDehubButtonComponent],
})
export class BuyDehubButtonModule {}
