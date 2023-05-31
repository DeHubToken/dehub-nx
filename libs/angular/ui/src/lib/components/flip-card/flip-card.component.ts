import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Courtesy: https://www.w3schools.com/howto/howto_css_flip_card.asp
 */
@Component({
  selector: 'dhb-flip-card',
  standalone: true,
  imports: [
    // Angular
    NgTemplateOutlet,
  ],
  template: `
    <div
      (click)="flipped = !flipped"
      [class.flipped]="flipped"
      class="flip-card animated"
    >
      <div [style.height.px]="heightPx || 59" class="flip-card-inner">
        <div class="flip-card-front">
          <ng-content select="[flip-card-front]" />
        </div>
        <div class="flip-card-back">
          <ng-content select="[flip-card-back]" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./flip-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCardComponent {
  @Input() heightPx?: number;

  flipped = false;
}
