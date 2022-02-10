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
  selector: 'dhb-connect-wallet-button',
  template: `
    <!-- Logout State -->
    <p-splitButton
      *ngIf="isAuthenticated; else notAuthenticated"
      [label]="label"
      [icon]="icon"
      [model]="items"
    ></p-splitButton>
    <ng-template #notAuthenticated>
      <!-- Login State -->
      <p-button
        [label]="label"
        [icon]="icon"
        (onClick)="showDialog.emit()"
      ></p-button>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletButtonComponent implements OnInit {
  @Input() label = 'Connect Wallet';
  @Input() icon = 'fas fa-wallet';
  @Input() isAuthenticated = false;

  @Output() showDialog = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  items: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout.emit(),
    },
  ];

  constructor() {}

  ngOnInit() {}
}
