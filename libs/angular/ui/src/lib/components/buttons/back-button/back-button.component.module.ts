import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BackButtonComponent } from './back-button.component';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,
  ],
  exports: [BackButtonComponent, ButtonModule],
})
export class BackButtonModule {}
