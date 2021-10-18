import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClaimHomeComponent } from './claim-home.component';
import { ClaimRoutingModule } from './claim-routing.module';

@NgModule({
  declarations: [ClaimHomeComponent],
  imports: [CommonModule, ClaimRoutingModule],
})
export class ClaimModule {}
