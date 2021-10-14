import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesHomeComponent } from './features-home.component';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [FeaturesHomeComponent],
  imports: [CommonModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
