import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { AppMainComponent } from '../app.main.component';

@Component({
  selector: 'dh-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnDestroy {
  subscription?: Subscription;

  items?: MenuItem[];

  constructor(public app: AppComponent, public appMain: AppMainComponent) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
