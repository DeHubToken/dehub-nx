import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'dhb-buy-dehub-button',
  template: `
    <p-splitButton
      [label]="label"
      [model]="items"
      (onClick)="onBuyClicked()"
    ></p-splitButton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent implements OnInit {
  @Input() label = 'Buy DeHub';
  @Input() cexUrl?: string;
  @Input() downloadWalletUrl?: string;

  items: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
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

  onBuyClicked() {
    this.router.navigate(['/shop']);
  }
}
