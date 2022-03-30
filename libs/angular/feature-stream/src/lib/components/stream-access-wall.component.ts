import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  template: ` <ng-container class="grid">
    <!-- Titles -->
    <dhb-page-header
      [page]="{ subtitle: 'OTT Access Wall', showSubtitle: true }"
    ></dhb-page-header>
  </ng-container>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamAccessWallComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
