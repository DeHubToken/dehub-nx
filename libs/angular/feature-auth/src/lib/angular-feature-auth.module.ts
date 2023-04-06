import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

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
    ToastModule,
    // Rx Angular
    PushModule,
    AngularFeatureAuthRoutingModule,
    AngularFeatureAuthComponent,
    ConnectWalletRequestComponent,
    ConnectWalletComponent,
    ConnectWalletOptionsComponent,
    DisconnectWalletComponent,
    ConnectedWalletComponent,
  ],
})
export class AngularFeatureAuthModule {}
