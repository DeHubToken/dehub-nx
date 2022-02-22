import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  template: `
    <iframe
      src="https://www.flooz.trade/embedded/0xFC206f429d55c71cb7294EfF40c6ADb20dC21508/?refId=AbAsFD&backgroundColor=linear-gradient(45deg%2Crgba(11%2C17%2C19%2C0.7)%2C%20rgba(5%2C17%2C24%2C0.7)%2046%25%2C%20rgba(6%2C12%2C29%2C0.7)%2071%25%2C%20rgba(50%2C19%2C56%2C0.7))"
      allow="clipboard-read; clipboard-write; web-share; accelerometer *; autoplay *; camera *; gyroscope *; payment *"
      loading="lazy"
      title="Flooz Trade"
      width="100%"
      height="640"
      frameborder="0"
      class="border-round border-neon-2"
    >
    </iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubFloozComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
