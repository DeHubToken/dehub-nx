import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard, DeAuthenticatedGuard } from '@dehub/angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AngularFeatureAuthComponent } from './angular-feature-auth.component';
import {
  ConnectedWalletComponent,
  ConnectWalletComponent,
  DisconnectWalletComponent,
} from './components/connect-wallet';
import { ConnectWalletRequestComponent } from './components/connect-wallet/connect-wallet-request.component';

const routes: Routes = [
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
        component: AngularFeatureAuthComponent,
        data: { dialogComponent: ConnectWalletRequestComponent },
        canActivate: [DeAuthenticatedGuard],
      },
      {
        path: 'connect',
        component: AngularFeatureAuthComponent,
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
        component: AngularFeatureAuthComponent,
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
        component: AngularFeatureAuthComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureAuthRoutingModule {}
