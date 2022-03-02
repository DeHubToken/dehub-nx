import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'dhb-buy-dehub-button',
  template: `<p-splitButton
    [label]="label"
    [model]="items"
    (onClick)="buy.emit()"
  ></p-splitButton>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent implements OnInit {
  @Input() label = 'Buy DeHub';
  @Input() cexUrl?: string;
  @Input() downloadWalletUrl?: string;

  @Output() buy = new EventEmitter<void>();
  @Output() dexSelected = new EventEmitter<void>();

  items: MenuItem[] = [];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'DEX',
        command: () => this.dexSelected.emit(),
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
}
