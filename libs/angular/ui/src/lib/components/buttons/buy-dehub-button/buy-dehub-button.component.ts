import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationTabMenu } from '@dehub/shared/model';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'dhb-buy-dehub-button',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    RouterModule,
    // PrimeNg
    SplitButtonModule,
  ],
  template: `
    <p-splitButton
      *ngIf="items"
      label="Buy DHB"
      [model]="items"
      [icon]="items[0].icon!"
      (onClick)="onBuyClick()"
    ></p-splitButton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent {
  @Input() items?: MenuItem[];

  constructor(private router: Router) {}

  onBuyClick() {
    this.router.navigate([NavigationTabMenu.Shop]);
  }
}
