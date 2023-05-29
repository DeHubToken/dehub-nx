import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'dhb-buy-dehub-button',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    // PrimeNg
    SplitButtonModule,
  ],
  template: `
    <p-splitButton
      *ngIf="items"
      label="Buy DHB"
      [model]="items"
      [icon]="items[0].icon!"
      (onClick)="defaultBuy.next()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent {
  @Input() items?: MenuItem[];
  @Output() readonly defaultBuy = new EventEmitter<void>();
}
