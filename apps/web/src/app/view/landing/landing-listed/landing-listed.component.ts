import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-landing-listed',
  template: `
    <div class="col-12 flex align-items-center mt-4 mb-5">
      <p class="uppercase bold mr-4">Listed On:</p>

      <!-- Coingecko -->
      <a
        href="https://www.coingecko.com/en/coins/dehub"
        target="_blank"
        class="pr-5"
      >
        <img src="/assets/landing/svg/coingecko-logo.svg" class="h-3rem" />
      </a>

      <!-- Coinmarketcap -->
      <a
        href="https://coinmarketcap.com/currencies/dehub/"
        target="_blank"
        class="pr-5"
      >
        <img src="/assets/landing/svg/coinmarketcap-logo.svg" class="h-3rem" />
      </a>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingListedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
