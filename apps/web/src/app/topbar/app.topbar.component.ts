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

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    public app: AppComponent,
    public appMain: AppMainComponent
  ) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
