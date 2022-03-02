import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { BuyDehubFloozComponent } from '@dehub/angular/ui/components/buy-dehub-flooz';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Env } from '../../environments/env';
import { AppComponent } from '../app.component';
import { AppMainComponent } from '../app.main.component';

@Component({
  selector: 'dhb-topbar',
  templateUrl: './app.topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopBarComponent implements OnDestroy {
  subscription?: Subscription;

  items?: MenuItem[];

  path = this.env.baseUrl;
  chainId = this.env.web3.chainId;
  cexUrl = this.env.dehub.cexUrl;
  downloadWalletUrl = this.env.dehub.downloadWalletUrl;
  isDev = this.env.env === 'dev';

  constructor(
    @Inject(EnvToken) private env: Env,
    public app: AppComponent,
    public appMain: AppMainComponent,
    private dialogService: DialogService
  ) {}

  onDexSelected() {
    this.dialogService.open(BuyDehubFloozComponent, {
      showHeader: true,
      header: 'Decentralised Exchange',
      width: '420px',
      styleClass: 'bg-gradient-3 border-neon-2',
      closeOnEscape: true,
      dismissableMask: true,
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
