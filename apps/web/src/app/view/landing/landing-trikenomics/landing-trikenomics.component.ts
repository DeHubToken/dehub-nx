import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Trikenomic } from '../landing-trikenomic/landing-trikenomic.component';

@Component({
  selector: 'dhb-landing-trikenomics',
  template: `
    <p class="col-12 text-3xl">
      The $DeHub Protocol charges 12% transaction fees and it is distributed to
      3 main features: token reflections to all holders, buy-back (we call it
      the Robin Hood System) and crypto collateral asset rewards to be claimed
      by holders from our rewards D’app.
    </p>

    <div class="landing-body">
      <div class="landing-wrapper">
        <div id="pricing" class="landing-pricing">
          <div class="grid">
            <div *ngFor="let trikenomic of trikenomics" class="col-12 md:col-4">
              <dhb-landing-trikenomic
                [trikenomic]="trikenomic"
              ></dhb-landing-trikenomic>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTrikenomicsComponent implements OnInit {
  trikenomics: Trikenomic[] = [
    {
      icon: 'fad fa-chart-network',
      percent: 2,
      title: '$DeHub Distribution',
      subTitle:
        '1% $DeHub reflections to all holders including burned wallet. The other 1% will be reflecting to operations wallets.',
    },
    {
      icon: 'fad fa-bow-arrow',
      percent: 4,
      title: 'Buy-Back',
      subTitle:
        "Robin Hood, our buy-back system uses the collected tax to buy back DeHub tokens, then instantly burns them which increases the token's value.",
    },
    {
      icon: 'fad fa-gift',
      percent: 4,
      title: 'BNB Distribution',
      subTitle:
        "2% To be claimed by holders from our rewards D'app & the other 2% to be utilized as project reserves.",
    },
    {
      icon: 'fad fa-balance-scale',
      percent: 2,
      title: 'Liquidity Pool',
      subTitle:
        '2% of every transaction contributes toward automatically generating further liquidity on Pancake Swap.',
    },
    {
      icon: 'fad fa-lock-alt',
      title: 'Fair Trade Measures',
      subTitle:
        'No private wallet can sell more than 0.1% of the circulating supply per day.',
    },
    {
      icon: 'fad fa-shield-alt',
      title: 'Fair Dilution Measures',
      subTitle:
        'No private wallet can hold more than 1% of the total supply at any given time.',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
