import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentComponent } from './tournament/tournament.component';

@NgModule({
  declarations: [TournamentComponent],
  imports: [CommonModule, TournamentsRoutingModule],
})
export class TournamentsModule {}
