import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg Modules
    ButtonModule,
  ],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
