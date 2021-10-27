import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-landing-listed',
  template: `
    <p class="col-3 uppercase">Listed On:</p>
    <span class="col-9">
      <!-- Coingecko -->
      <a
        href="https://www.coingecko.com/en/coins/dehub"
        target="_blank"
        class="m-1"
      >
        <img src="/assets/landing/svg/coingecko-logo.svg" class="w-2rem" />
      </a>
      <!-- Coinmarketcap -->
      <a
        href="https://coinmarketcap.com/currencies/dehub/"
        target="_blank"
        class="m-1"
      >
        <img src="/assets/landing/svg/coinmarketcap-logo.svg" class="w-2rem" />
      </a>
    </span>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingListedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
