import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Partner } from '../landing-partner/landing-partner.component';

@Component({
  selector: 'dhb-landing-partners',
  template: `
    <div class="grid">
      <div *ngFor="let partner of partners" class="col-12 md:col-4">
        <dhb-landing-partner [partner]="partner"></dhb-landing-partner>
      </div>
    </div>

    <!-- Become a Partner -->
    <div class="col-12 flex justify-content-center">
      <button
        pButton
        pRipple
        type="button"
        label="Become a Partner"
        class="button-rounded uppercase"
      ></button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPartnersComponent implements OnInit {
  partners: Partner[] = [
    {
      title: 'Mazer Gaming',
      logo: 'mazer',
      website: 'https://mazer.gg/',
      description: "DeHub's gaming tournament partner.",
    },
    {
      title: 'Ngne Sports',
      logo: 'ngne',
      website: 'https://mazer.gg/',
      description: "DeHub's gaming tournament partner.",
    },
    {
      title: 'Vida Sports Management',
      logo: 'vida',
      website: 'https://mazer.gg/',
      description: "DeHub's gaming tournament partner.",
    },
    {
      title: 'JDN | Advertising Copywriter',
      logo: 'jdn',
      website: 'https://mazer.gg/',
      description: 'Media & Branding Advisor.',
    },
    {
      title: 'Rapz',
      logo: 'rapz',
      website: 'https://mazer.gg/',
      description: "DeHub's gaming tournament partner.",
    },
    {
      title: 'Agenz Ltd.',
      logo: 'agenz',
      website: 'https://www.agenz.uk/',
      description: "DeHub's gaming tournament partner.",
    },
  ];

  ngOnInit(): void {}
}
