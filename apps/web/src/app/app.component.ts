import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreService, PwaService } from '@dehub/angular/core';
import { MenuMode, ThemeMode } from '@dehub/shared/model';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'dhb-root',
  template: `
    <router-outlet></router-outlet>

    <!-- PWA update available popup -->
    <dhb-sw-update-available
      (update)="onSwUpdate()"
      (cancel)="onSwCancel()"
    ></dhb-sw-update-available>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  menuMode: MenuMode = 'horizontal';

  darkMode: ThemeMode = 'dark';
  topbarTheme: ThemeMode = 'dark';
  menuTheme: ThemeMode = 'dark';

  constructor(
    private coreService: CoreService,
    private pwaService: PwaService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.coreService.loadManifest();
    this.coreService.loadIcon();

    this.pwaService.subscribeForNewUpdates();

    this.primengConfig.ripple = true;
  }

  onSwUpdate() {
    this.pwaService.activateUpdate();
  }

  onSwCancel() {
    this.pwaService.cancelUpdate();
  }

  ngOnDestroy() {
    this.pwaService.unsubscribeNotifications();
  }
}
