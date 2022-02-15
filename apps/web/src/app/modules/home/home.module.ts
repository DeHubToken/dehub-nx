import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules

    // PrimeNg Modules

    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
