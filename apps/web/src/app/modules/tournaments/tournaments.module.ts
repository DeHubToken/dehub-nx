import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { TournamentBadgeComponent } from './tournament/tournament-badge.component';
import { TournamentCardComponent } from './tournament/tournament-card.component';
import { CountDownComponent } from './tournament/count-down.component';

const angularModules = [CommonModule];
const primeNgModules = [CarouselModule, TagModule];

@NgModule({
  imports: [angularModules, primeNgModules, TournamentsRoutingModule],
  declarations: [
    TournamentComponent,
    TournamentCardComponent,
    TournamentBadgeComponent,
    CountDownComponent,
  ],
})
export class TournamentsModule {}
