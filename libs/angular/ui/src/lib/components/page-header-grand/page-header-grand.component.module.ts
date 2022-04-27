import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderGrandComponent } from '@dehub/angular/ui/components/page-header-grand/page-header-grand.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PageHeaderGrandComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,
  ],
  exports: [PageHeaderGrandComponent],
})
export class PageHeaderGrandModule {}
