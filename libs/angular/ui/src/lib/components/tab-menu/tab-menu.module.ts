import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TabMenuComponent } from './tab-menu.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    // PrimeNg
    ButtonModule,
    RippleModule,
    TabMenuComponent,
  ],
  exports: [TabMenuComponent],
})
export class TabMenuModule {}
