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
  template: `<p-splitButton [label]="label" [model]="items"></p-splitButton>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent implements OnInit {
  @Input() label = 'Buy DeHub';
  @Input() cexUrl?: string;

  @Output() dexSelected = new EventEmitter<void>();

  items: MenuItem[] = [
    {
      label: 'DEX',
      command: () => this.dexSelected.emit(),
    },
    {
      label: 'CEX',
      url: this.cexUrl,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
