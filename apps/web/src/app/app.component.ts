import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AngularCoreModule,
  AnnouncementService,
  CoreService,
  LoaderService,
  PwaService,
} from '@dehub/angular/core';
import { LoaderModule } from '@dehub/angular/ui/components/loader/loader.module';
import { MenuMode, ThemeMode } from '@dehub/shared/model';
import { PushModule } from '@rx-angular/template/push';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';

@Component({
  selector: 'dhb-root',
  template: `
    <router-outlet></router-outlet>

    <!-- Toast Messages -->
    <p-toast></p-toast>

    <!-- Confirmations -->
    <p-confirmDialog></p-confirmDialog>

    <!-- PWA update available popup -->
    <dhb-sw-update-available
      (update)="onSwUpdate()"
      (cancel)="onSwCancel()"
    ></dhb-sw-update-available>

    <!-- Loader -->
    <dhb-loader
      *ngIf="loaderVisible$ | push"
      [subtitle]="subtitle$ | push"
      [loaderGif]="loaderGif"
    ></dhb-loader>
  `,
  standalone: true,
  imports: [
    // Angular
    NgIf,
    RouterOutlet,

    // Rx Angular
    PushModule,

    // PrimeNg
    ToastModule,
    ConfirmDialogModule,

    // Libs
    LoaderModule,

    AngularCoreModule,
  ],
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
    private loaderService: LoaderService,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit() {
    this.coreService.loadManifest();
    this.coreService.loadIcon();

    this.pwaService.subscribeForNewUpdates();
    this.announcementService.subscribeForAnnouncements();

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
    this.announcementService.unsubscribeAnnouncements();
  }
}
