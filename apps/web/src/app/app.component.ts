import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreService, LoaderService, PwaService } from '@dehub/angular/core';

import { LoaderComponent } from '@dehub/angular/ui/components/loader/loader.component';
import { SwUpdateAvailableComponent } from '@dehub/angular/ui/components/sw-update-available/sw-update-available.component';
import { MenuMode, ThemeMode } from '@dehub/shared/model';
import { PushModule } from '@rx-angular/template/push';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';

@Component({
  selector: 'dhb-root',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    RouterOutlet,
    // 3rd Party
    PushModule,
    // PrimeNG
    ToastModule,
    ConfirmDialogModule,
    // UI
    LoaderComponent,
    SwUpdateAvailableComponent,
  ],
  template: `
    <router-outlet />

    <!-- Toast Messages -->
    <p-toast />

    <!-- Confirmations -->
    <p-confirmDialog />

    <!-- PWA update available popup -->
    <dhb-sw-update-available (update)="onSwUpdate()" (cancel)="onSwCancel()" />

    <!-- Loader -->
    <dhb-loader
      *ngIf="loaderVisible$ | push"
      [subtitle]="subtitle$ | push"
      [loaderGif]="loaderGif"
    />
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  menuMode: MenuMode = 'horizontal';

  darkMode: ThemeMode = 'dark';
  topbarTheme: ThemeMode = 'dark';
  menuTheme: ThemeMode = 'dark';

  loaderVisible$?: Observable<boolean>;
  subtitle$?: Observable<string>;
  loaderGif?: string;

  constructor(
    private coreService: CoreService,
    private pwaService: PwaService,
    private primengConfig: PrimeNGConfig,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.coreService.loadManifest();
    this.coreService.loadIcon();

    this.pwaService.subscribeForNewUpdates();

    const { loaderVisible$, subtitle$, loaderGif } = this.loaderService;
    this.loaderVisible$ = loaderVisible$;
    this.subtitle$ = subtitle$;
    this.loaderGif = loaderGif;

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
