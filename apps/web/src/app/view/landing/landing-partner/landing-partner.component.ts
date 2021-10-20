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
    <div *ngIf="partner" class="card image-card">
      <img
        [src]="'assets/landing/partners/' + partner.logo + '-logo.svg'"
        [alt]="partner.title"
      />
      <div class="image-content">
        <a [href]="partner.website"
          ><h6>{{ partner.title }}</h6>
          <i class="pi pi-external-link"></i
        ></a>
        <p>{{ partner.description }}</p>
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
