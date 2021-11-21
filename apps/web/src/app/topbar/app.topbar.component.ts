import { APP_BASE_HREF } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { Env } from '@dehub/shared/config';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { AppMainComponent } from '../app.main.component';

@Component({
  selector: 'dhb-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnDestroy {
  subscription?: Subscription;

  items?: MenuItem[];

  subPath = `${this.env.production ? `${this.baseHref}/` : ''}`;

  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
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
