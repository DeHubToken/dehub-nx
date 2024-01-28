import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animationDuration } from '@dehub/shared/model';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { BackButtonComponent } from '../buttons/back-button/back-button.component';

@Component({
  selector: 'dhb-back-aware',
  standalone: true,
  imports: [
    // Angular
    RouterLink,
    // UI
    BackButtonComponent,
  ],
  template: `
    <!-- Back (top) -->
    <dhb-back-button [@fadeInUp] [routerLink]="backRouterLink" />

    <ng-content />

    <!-- Back (bottom) -->
    <dhb-back-button [@fadeInUp] [routerLink]="backRouterLink" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'fadeInUp',
      duration: animationDuration,
      delay: animationDuration,
    }),
  ],
})
export class BackAwareComponent {
  @Input() backRouterLink!: string[];
}
