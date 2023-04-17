import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  standalone: true,
  selector: 'dhb-buy-dehub-button',
  imports: [
    // Angular
    NgIf,
    RouterLink,

    // PrimeNg
    SplitButtonModule,
  ],
  template: `
    <p-splitButton
      *ngIf="items"
      label="Buy DeHub"
      [model]="items"
      [icon]="items[0].icon!"
      [routerLink]="items[0].routerLink"
    ></p-splitButton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent {
  @Input() items?: MenuItem[];
}
