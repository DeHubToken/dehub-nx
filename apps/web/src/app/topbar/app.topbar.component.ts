import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CoreService } from '@dehub/angular/core';
import { MoralisService } from '@dehub/angular/moralis';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
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

  path = this.coreService.path;

  user$ = this.moralisService.user$;
  userLoggedIn$ = this.moralisService.userLoggedIn$;

  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    private coreService: CoreService,
    private moralisService: MoralisService
  ) {}

  login(provider: 'metamask' | 'walletconnect' = 'metamask') {
    this.moralisService.login(provider);
  }

  logout() {
    this.moralisService.logout();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
