import { Routes } from '@angular/router';
import { AuthenticatedGuard, DeAuthenticatedGuard } from '@dehub/angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import {
  ConnectWalletComponent,
  ConnectedWalletComponent,
  DisconnectWalletComponent,
} from './components/connect-wallet';
import { ConnectWalletRequestComponent } from './components/connect-wallet/connect-wallet-request.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'request',
        pathMatch: 'full',
      },
      {
        path: 'request',
        loadComponent: () => import('./angular-feature-auth.component'),
        data: { dialogComponent: ConnectWalletRequestComponent },
        canActivate: [DeAuthenticatedGuard],
      },
      {
        path: 'connect',
        loadComponent: () => import('./angular-feature-auth.component'),
        data: {
          dialogComponent: ConnectWalletComponent,
          dialogConfig: {
            header: 'Connect Wallet',
            width: '350px',
          } as DynamicDialogConfig,
        },
        canActivate: [DeAuthenticatedGuard],
      },
      {
        path: 'disconnect',
        loadComponent: () => import('./angular-feature-auth.component'),
        data: {
          dialogComponent: DisconnectWalletComponent,
          dialogConfig: {
            header: 'Disconnected',
            width: '350px',
          } as DynamicDialogConfig,
        },
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'connected',
        loadComponent: () => import('./angular-feature-auth.component'),
        data: {
          dialogComponent: ConnectedWalletComponent,
          dialogConfig: {
            header: 'Already Connected',
            width: '350px',
          } as DynamicDialogConfig,
        },
        canActivate: [AuthenticatedGuard],
      },
    ],
  },
];
