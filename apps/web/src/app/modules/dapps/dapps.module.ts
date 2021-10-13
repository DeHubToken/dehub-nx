import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DappsHomeComponent } from './dapps-home.component';
import { DappsRoutingModule } from './dapps-routing.module';

@NgModule({
  declarations: [DappsHomeComponent],
  imports: [CommonModule, DappsRoutingModule],
})
export class DappsModule {}
