import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  template: `
    <iframe
      src="https://www.flooz.trade/embedded/0xFC206f429d55c71cb7294EfF40c6ADb20dC21508/?refId=AbAsFD&backgroundColor=transparent"
      allow="clipboard-read; clipboard-write; web-share; accelerometer *; autoplay *; camera *; gyroscope *; payment *"
      loading="lazy"
      title="Flooz Trade"
      width="100%"
      height="640"
      frameborder="0"
      class="border-round"
    >
    </iframe>
  `,
  styles: [
    `
      iframe {
        margin-top: -40px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubFloozComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
