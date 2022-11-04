import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'dhb-buy-dehub-button',
  template: ` <!-- https://github.com/DeHubToken/dehub-nx/issues/353 -->
    <!-- <p-splitButton
    [label]="label"
    [model]="items"
    (onClick)="onBuyClicked($event)"
  ></p-splitButton> -->
    <p-button [label]="label" (onClick)="onBuyClicked()"></p-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent implements OnInit {
  @Input() label = 'Buy DeHub';
  @Input() cexUrl?: string;
  @Input() downloadWalletUrl?: string;
  @Input() buyDappUrl?: string;

  @Output() buyWithCard = new EventEmitter<void>();

  items: MenuItem[] = [];

  constructor(
    @Inject(WINDOW) private readonly windowRef: Window,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Buy With Card',
        command: () => this.buyWithCard.emit(),
      },
      {
        label: 'CEX',
        url: this.cexUrl,
        target: '_blank',
      },
      {
        label: 'Download Wallet',
        url: this.downloadWalletUrl,
        target: '_blank',
      },
    ];
  }

  // onBuyClicked(event: Event) {
  //   event.preventDefault();
  //   this.windowRef.open(this.buyDappUrl, '_self', 'noopener,noreferrer');
  // }

  onBuyClicked() {
    this.router.navigate(['/shop']);
  }
}
