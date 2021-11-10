import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-landing-links',
  template: `
    <div class="col-12">
      <!-- White Paper -->
      <a
        href="/uploads/Dehub%20Whitepaper%20V3%20-%202021.pdf"
        target="_blank"
        class="pr-3"
      >
        <button
          pButton
          pRipple
          type="button"
          label="White Paper"
          class="button-rounded uppercase"
        ></button>
      </a>

      <!-- Chart -->
      <a
        href="https://poocoin.app/tokens/0xfc206f429d55c71cb7294eff40c6adb20dc21508"
        target="_blank"
        class="pr-3"
      >
        <button
          pButton
          pRipple
          type="button"
          label="Chart"
          class="button-rounded uppercase"
        ></button>
      </a>

      <!-- Buy -->
      <a
        href="https://pancakeswap.finance/swap?outputCurrency=0xFC206f429d55c71cb7294EfF40c6ADb20dC21508"
        target="_blank"
        class=""
      >
        <button
          pButton
          pRipple
          type="button"
          label="Buy"
          class="button-rounded uppercase"
        ></button>
      </a>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingLinksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
