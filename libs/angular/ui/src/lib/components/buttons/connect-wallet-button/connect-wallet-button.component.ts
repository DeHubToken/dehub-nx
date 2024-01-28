import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'dhb-connect-wallet-button',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    // PrimeNG
    SplitButtonModule,
    ButtonModule,
  ],
  template: `
    <!-- Logout State -->
    <p-splitButton
      *ngIf="isAuthenticated; else notAuthenticated"
      [label]="label"
      [icon]="icon"
      [model]="items"
    />
    <ng-template #notAuthenticated>
      <!-- Login State -->
      <p-button [label]="label" [icon]="icon" (onClick)="onLoginClick()" />
    </ng-template>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletButtonComponent implements OnInit {
  @Input() label = 'Connect Wallet';
  @Input() icon = 'fas fa-wallet';
  @Input() isAuthenticated = false;

  items: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.onLogOutClick(),
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  onLoginClick() {
    this.router.navigate(['/', { outlets: { modal: ['auth', 'connect'] } }], {
      queryParamsHandling: 'preserve',
    });
  }

  onLogOutClick() {
    this.router.navigate(
      ['/', { outlets: { modal: ['auth', 'disconnect'] } }],
      {
        queryParamsHandling: 'preserve',
      }
    );
  }
}
