import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '@dehub/shared/models';

@Component({
  selector: 'dhb-tournament-card',
  template: `
    <div
      *ngIf="tournament"
      [class.opacity-50]="!tournament.featured"
      class="tournament-card"
    >
      <div class="border-round m-2">
        <div class="mb-4">
          <img
            [src]="tournament.coverImage?.url"
            [alt]="tournament.title"
            class="w-full"
          />
        </div>

        <div class="tournament-card-content px-4">
          <!-- Title -->
          <h4 class="mb-1">{{ tournament.title }}</h4>

          <!-- Date -->
          <div class="mb-4">
            <i class="fa fa-calendar-alt"></i>
            {{ tournament.date | date: 'EEE, MMM d, y, hh:mm:ss zzzz' }}
          </div>

          <!-- Count Down -->
          <div *ngIf="!expired" class="mb-4">
            <dhb-count-down
              [countDownDateStr]="tournament.date"
            ></dhb-count-down>
          </div>

          <!-- Badge -->
          <div class="mb-4">
            <dhb-tournament-badge
              [tournament]="tournament"
              [expired]="expired"
            ></dhb-tournament-badge>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TournamentCardComponent implements OnInit {
  @Input() tournament?: Tournament;

  expired = false;

  constructor() {}

  ngOnInit() {
    if (!this.tournament) return;

    const { date } = this.tournament;
    this.expired =
      date === undefined || (date !== undefined && new Date(date) < new Date());
  }
}
