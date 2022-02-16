import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules

    // PrimeNg Modules

    AngularFeatureHomeRoutingModule,
  ],
  declarations: [AngularFeatureHomeComponent],
})
export class AngularFeatureHomeModule {}
