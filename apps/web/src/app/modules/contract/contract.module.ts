import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContractHomeComponent } from './contract-home.component';
import { ContractRoutingModule } from './contract-routing.module';

@NgModule({
  declarations: [ContractHomeComponent],
  imports: [CommonModule, ContractRoutingModule],
})
export class ContractModule {}
