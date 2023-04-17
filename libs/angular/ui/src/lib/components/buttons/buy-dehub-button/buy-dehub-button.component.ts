import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationTabMenu } from '@dehub/shared/model';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  standalone: true,
  selector: 'dhb-buy-dehub-button',
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    SplitButtonModule,
  ],
  template: `
    <p-splitButton
      *ngIf="items"
      label="Buy DeHub"
      [model]="items"
      [icon]="items[0].icon!"
      (onClick)="onBuyClicked()"
    ></p-splitButton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDehubButtonComponent {
  @Input() items?: MenuItem[];

  constructor(private router: Router) {}

  onBuyClicked() {
    this.router.navigate([NavigationTabMenu.Shop]);
  }
}
