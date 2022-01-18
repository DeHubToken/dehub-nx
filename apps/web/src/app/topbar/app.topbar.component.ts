import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { MenuItem } from 'primeng/api';
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
  chainId = this.env.chainId;

  constructor(
    @Inject(EnvToken) private env: Env,
    public app: AppComponent,
    public appMain: AppMainComponent
  ) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
