import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, IMoralisService, MoralisToken } from '@dehub/angular/model';
import { shortenAddress } from '@dehub/shared/utils';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { Env } from '../../environments/env';
import { AppComponent } from '../app.component';
import { AppMainComponent } from '../app.main.component';

@Component({
  selector: 'dhb-topbar',
  templateUrl: './app.topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopBarComponent implements OnInit {
  items?: MenuItem[];

  path = this.env.baseUrl;
  chainId = this.env.web3.chainId;
  magicLinkApiKey = this.env.web3.auth.magicLinkApiKey;
  cexUrl = this.env.dehub.cexUrl;
  downloadWalletUrl = this.env.dehub.downloadWalletUrl;
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
    public appMain: AppMainComponent
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
}
