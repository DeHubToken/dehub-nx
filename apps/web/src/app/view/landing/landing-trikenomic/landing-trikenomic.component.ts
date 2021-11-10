import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
export interface Trikenomic {
  icon: string;
  percent?: number;
  title: string;
  subTitle: string;
}
@Component({
  selector: 'dhb-landing-trikenomic',
  template: `
    <div *ngIf="trikenomic" class="pricing-card enterprise shadow-8">
      <span class="time">
        <i
          [ngClass]="trikenomic.icon"
          class="text-7xl"
          style="--fa-primary-color: #7C08A3; --fa-secondary-color: #00B7D3; --fa-secondary-opacity: 1.0;"
        >
        </i>
      </span>
      <h2>{{ trikenomic.title }}</h2>
      <span *ngIf="trikenomic.percent" class="price"
        >{{ trikenomic.percent }}%</span
      >
      <ul>
        <li>{{ trikenomic.subTitle }}</li>
      </ul>
    </div>
  `,
  styles: [
    `
      .pricing-card {
        .time {
          opacity: 1 !important;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTrikenomicComponent implements OnInit {
  @Input() trikenomic?: Trikenomic;

  constructor() {}

  ngOnInit(): void {}
}
