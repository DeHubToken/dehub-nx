import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: `
    <iframe
      [src]="letsExchangeUrl"
      title="LetsExchange"
      width="100%"
      height="400"
      frameborder="0"
      allow="clipboard-read; clipboard-write"
      class="border-round"
    ></iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetsExchangeComponent {
  letsExchangeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://letsexchange.io/v2/widget?affiliate_id=0wKcEmTktPML90Nx&is_iframe=true'
  );

  constructor(private sanitizer: DomSanitizer) {}
}
