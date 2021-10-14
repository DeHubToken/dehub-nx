import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PartnersHomeComponent } from './partners-home.component';
import { PartnersRoutingModule } from './partners-routing.module';

@NgModule({
  declarations: [PartnersHomeComponent],
  imports: [CommonModule, PartnersRoutingModule],
})
export class PartnersModule {}
