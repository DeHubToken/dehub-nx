import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Courtesy: https://www.w3schools.com/howto/howto_css_flip_card.asp
 */
@Component({
  selector: 'dhb-flip-card',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgTemplateOutlet,
  ],
  template: `
    <div
      (click)="flipped = !flipped; visited = true"
      [class.flipped]="flipped"
      [class.animated]="visited"
      class="flip-card"
    >
      <!-- Touch area -->
      <span *ngIf="!visited" class="opacity-20 pt-4" style="float: left">
        <i class="fa-solid fa-mouse fa-fade fa-xl hidden xl:block"></i>
        <i class="fa-solid fa-fingerprint fa-fade fa-xl block xl:hidden"></i>
      </span>

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
  visited = false;
}
