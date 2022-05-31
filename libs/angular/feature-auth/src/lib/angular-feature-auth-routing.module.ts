import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard, DeAuthenticatedGuard } from '@dehub/angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AngularFeatureAuthComponent } from './angular-feature-auth.component';
import { AuthBaseComponent } from './components/auth-base/auth-base.component';
import { ConnectWalletComponent } from './components/connect-wallet';
import { ConnectedWalletComponent } from './components/connected-wallet';
import { DisconnectWalletComponent } from './components/disconnect-wallet';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'base',
        pathMatch: 'full',
      },
      {
        path: 'base',
        component: AngularFeatureAuthComponent,
        data: { insertComponent: AuthBaseComponent },
        canActivate: [DeAuthenticatedGuard],
      },
      {
        path: 'connect',
        component: AngularFeatureAuthComponent,
        data: {
          insertComponent: ConnectWalletComponent,
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
          insertComponent: DisconnectWalletComponent,
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
          insertComponent: ConnectedWalletComponent,
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
