import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { WalletButtonModule } from '@dehub/angular/ui/components/buttons/wallet-button';
import { LoaderModule } from '@dehub/angular/ui/components/loader';
import { PushModule } from '@rx-angular/template/push';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AngularFeatureAuthRoutingModule } from './angular-feature-auth-routing.module';
import { AngularFeatureAuthComponent } from './angular-feature-auth.component';
import {
  ConnectWalletComponent,
  ConnectWalletOptionsComponent,
  ConnectWalletRequestComponent,
  ConnectedWalletComponent,
  DisconnectWalletComponent,
} from './components/connect-wallet';

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
    ToastModule, // TODO: not sure why p-inplace need this

    // Libs
    WalletButtonModule,
    LoaderModule,

    // Rx Angular
    PushModule,

    AngularFeatureAuthRoutingModule,
  ],
  declarations: [
    AngularFeatureAuthComponent,
    ConnectWalletRequestComponent,
    ConnectWalletComponent,
    ConnectWalletOptionsComponent,
    DisconnectWalletComponent,
    ConnectedWalletComponent,
  ],
})
export class AngularFeatureAuthModule {}
