import { NgIf, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnvToken, IMoralisService, MoralisToken } from '@dehub/angular/model';

import { LetsExchangeComponent } from '@dehub/angular/ui/components//lets-exchange/lets-exchange.component';
import { BuyDehubButtonComponent } from '@dehub/angular/ui/components/buttons/buy-dehub-button/buy-dehub-button.component';
import { ConnectWalletButtonComponent } from '@dehub/angular/ui/components/buttons/connect-wallet-button/connect-wallet-button.component';
import { getBuyDehubMenuItems, shortenAddress } from '@dehub/shared/utils';
import { PushModule } from '@rx-angular/template/push';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, map } from 'rxjs';
import { Env } from '../../environments/env';
import { AppComponent } from '../app.component';
import { AppMainComponent } from '../app.main.component';
import { AppMenuComponent } from './menu/app.menu.component';
@Component({
  selector: 'dhb-topbar',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    RouterLink,
    NgOptimizedImage,
    // 3rd Party
    PushModule,
    // UI
    BuyDehubButtonComponent,
    ConnectWalletButtonComponent,
    LetsExchangeComponent,

    AppMenuComponent,
  ],
  template: `<div class="layout-topbar">
    <div class="layout-topbar-wrapper flex-column sm:flex-row">
      <div class="layout-topbar-left">
        <a
          *ngIf="isDev"
          tabindex="0"
          class="menu-button"
          (click)="appMain.onMenuButtonClick($event)"
        >
          <i class="pi pi-bars"></i>
        </a>
        <a routerLink="" tabindex="0" id="logo-link" class="layout-topbar-logo">
          <img
            [ngSrc]="
              path +
              '/assets/dehub/logo-' +
              (app.topbarTheme === 'dark' ? 'dehub-white' : 'dehub') +
              '.svg'
            "
            height="25"
            width="107"
            alt="DeHub logo"
          />
        </a>
      </div>

      <dhb-menu *ngIf="isDev" />

      <div class="layout-topbar-right">
        <ul class="layout-topbar-actions">
          <li class="topbar-item">
            <dhb-buy-dehub-button
              [items]="buyDehubMenuItems"
              (defaultBuy)="onDefaultBuy()"
            />
          </li>
          <li class="topbar-item ml-2 md:ml-4">
            <dhb-connect-wallet-button
              [label]="(connectWalletButtonLabel$ | push)!"
              [isAuthenticated]="(isAuthenticated$ | push)!"
              [icon]="connectWalletButtonIcon"
            />
          </li>
        </ul>
      </div>
    </div>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopBarComponent implements OnInit {
  buyDehubMenuItems = getBuyDehubMenuItems(
    this.env.dehub.landing,
    this.env.dehub.cexUrl,
    this.env.dehub.downloadMetamaskUrl,
    this.onSwap.bind(this),
    true
  );

  path = this.env.baseUrl;
  chainId = this.env.web3.chainId;
  magicLinkApiKey = this.env.web3.auth.magicLinkApiKey;
  isDev = this.env.env === 'dev';

  // Connect Wallet Button
  connectWalletButtonLabel = 'Connect Wallet';
  connectWalletButtonIcon = 'fas fa-wallet';
  connectWalletButtonLabel$?: Observable<string>;
  isAuthenticated$?: Observable<boolean>;

  constructor(
    @Inject(EnvToken) private env: Env,
    @Inject(MoralisToken) private moralisService: IMoralisService,
    public app: AppComponent,
    public appMain: AppMainComponent,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    const { account$, isAuthenticated$ } = this.moralisService;

    this.isAuthenticated$ = isAuthenticated$;

    this.connectWalletButtonLabel$ = account$.pipe(
      map(account =>
        account ? shortenAddress(account) : this.connectWalletButtonLabel
      )
    );
  }

  onSwap() {
    this.dialogService.open(LetsExchangeComponent, {
      header: 'Swap',
      width: '420px',
      styleClass: 'bg-gradient-3 border-neon-2',
      closeOnEscape: true,
      dismissableMask: true,
    });
  }

  onDefaultBuy() {
    // Use first item which is the Swap as default
    this.buyDehubMenuItems[0].command &&
      this.buyDehubMenuItems[0].command(undefined);
  }
}
