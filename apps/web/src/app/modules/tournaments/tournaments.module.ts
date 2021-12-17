import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { CountDownComponent } from './tournament/count-down.component';
import { TournamentBadgeComponent } from './tournament/tournament-badge.component';
import { TournamentCardSkeletonComponent } from './tournament/tournament-card-skeleton.component';
import { TournamentCardComponent } from './tournament/tournament-card.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentsRoutingModule } from './tournaments-routing.module';

const angularModules = [CommonModule];

const libModules = [SafeHtmlPipeModule, ContentfulDraftDirectiveModule];

const primeNgModules = [
  CarouselModule,
  TagModule,
  ButtonModule,
  RippleModule,
  DialogModule,
  SkeletonModule,
];

@NgModule({
  imports: [
    angularModules,
    libModules,
    primeNgModules,
    TournamentsRoutingModule,
  ],
  declarations: [
    TournamentComponent,
    TournamentCardComponent,
    TournamentBadgeComponent,
    CountDownComponent,
    TournamentCardSkeletonComponent,
  ],
})
export class TournamentsModule {}
