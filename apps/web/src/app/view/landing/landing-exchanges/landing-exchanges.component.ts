import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-landing-exchanges',
  template: `
    <div class="col-12 flex align-items-center mt-4 mb-5">
      <p class="uppercase bold mr-4">Exchanges:</p>

      <!-- XT.com -->
      <a
        href="https://www.xt.com/tradePro/dehub_usdt"
        target="_blank"
        class="pr-5"
      >
        <img src="/assets/landing/svg/xt-logo.svg" class="h-3rem" />
      </a>

      <!-- PancakeSwap -->
      <a
        href="https://pancakeswap.finance/swap?outputCurrency=0xFC206f429d55c71cb7294EfF40c6ADb20dC21508"
        target="_blank"
        class="pr-5"
      >
        <img src="/assets/landing/svg/pancakeswap-logo.svg" class="h-3rem" />
      </a>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingExchangesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
