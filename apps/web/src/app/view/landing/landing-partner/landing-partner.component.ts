import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

export interface Partner {
  logo: string;
  title: string;
  website: string;
  description: string;
}

@Component({
  selector: 'dhb-landing-partner',
  template: `
    <div *ngIf="partner" class="card image-card shadow-8">
      <img
        [src]="'assets/landing/partners/' + partner.logo + '-logo.svg'"
        [alt]="partner.title"
        class="h-8rem mt-6"
      />
      <div class="image-content text-center">
        <a [href]="partner.website" class="text-3xl uppercase">
          {{ partner.title }}
          <i class="fas fa-external-link-alt"></i>
        </a>
        <p class="text-2xl">{{ partner.description }}</p>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPartnerComponent implements OnInit {
  @Input() partner?: Partner;

  constructor() {}

  ngOnInit(): void {}
}
