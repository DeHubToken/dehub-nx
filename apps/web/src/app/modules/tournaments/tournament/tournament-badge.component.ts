import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '@dehub/shared/models';

@Component({
  selector: 'dhb-tournament-badge',
  template: `
    <p-tag [rounded]="true" [severity]="severity" [value]="badge"></p-tag>
  `,
})
export class TournamentBadgeComponent implements OnInit {
  @Input() tournament?: Tournament;
  @Input() expired = false;

  badge: string | 'Finished' = 'Finished';
  severity: 'success' | 'info' = 'info';

  ngOnInit() {
    if (!this.tournament) return;

    const { badge } = this.tournament;

    if (!this.expired && badge) this.badge = badge;
    if (!this.expired) this.severity = 'success';
  }
}
