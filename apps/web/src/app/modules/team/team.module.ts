import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TeamHomeComponent } from './team-home.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [TeamHomeComponent],
  imports: [CommonModule, TeamRoutingModule],
})
export class TeamModule {}
