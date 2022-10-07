import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreService, LoaderService, PwaService } from '@dehub/angular/core';
import { AnnouncementComponent } from '@dehub/angular/ui/components/announcement';
import { MenuMode, ThemeMode } from '@dehub/shared/model';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
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
      [lottieJson]="lottieJson"
    ></dhb-loader>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  menuMode: MenuMode = 'horizontal';

  darkMode: ThemeMode = 'dark';
  topbarTheme: ThemeMode = 'dark';
  menuTheme: ThemeMode = 'dark';

  loaderVisible$?: Observable<boolean>;
  subtitle$?: Observable<string>;
  lottieJson?: string;

  constructor(
    private coreService: CoreService,
    private pwaService: PwaService,
    private primengConfig: PrimeNGConfig,
    private loaderService: LoaderService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.coreService.loadManifest();
    this.coreService.loadIcon();

    this.pwaService.subscribeForNewUpdates();

    const { loaderVisible$, subtitle$, lottieJson } = this.loaderService;
    this.loaderVisible$ = loaderVisible$;
    this.subtitle$ = subtitle$;
    this.lottieJson = lottieJson;

    this.primengConfig.ripple = true;

    setTimeout(
      () =>
        this.dialogService.open(AnnouncementComponent, {
          showHeader: true,
          header: 'Announcement',
          width: '620px',
          styleClass: 'bg-gradient-3 border-neon-1',
          closeOnEscape: true,
          dismissableMask: true,
          closable: true,
        }),
      500 // Delay in order to show on top of other dialogs like connect wallet
    );
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
