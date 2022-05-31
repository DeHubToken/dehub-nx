import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { LoaderModule } from '@dehub/angular/ui/components/loader';
import { WalletButtonModule } from '@dehub/angular/ui/components/wallet-button';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { AngularFeatureAuthRoutingModule } from './angular-feature-auth-routing.module';
import { AngularFeatureAuthComponent } from './angular-feature-auth.component';
import { AuthBaseComponent } from './components/auth-base';
import { ConnectWalletComponent } from './components/connect-wallet';
import { ConnectWalletOptionsComponent } from './components/connect-wallet-options';
import { ConnectedWalletComponent } from './components/connected-wallet';
import { DisconnectWalletComponent } from './components/disconnect-wallet';

export const angularFeatureAuthRoutes: Route[] = [];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // PrimeNg
    InplaceModule,
    InputTextModule,

    // Libs
    WalletButtonModule,
    LoaderModule,

    AngularFeatureAuthRoutingModule,
  ],
  declarations: [
    AngularFeatureAuthComponent,
    AuthBaseComponent,
    ConnectWalletComponent,
    ConnectWalletOptionsComponent,
    DisconnectWalletComponent,
    ConnectedWalletComponent,
  ],
})
export class AngularFeatureAuthModule {}
