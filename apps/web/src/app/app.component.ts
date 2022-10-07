import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CoreService, LoaderService, PwaService } from '@dehub/angular/core';
import { MenuMode, ThemeMode } from '@dehub/shared/model';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'dhb-info',
  template: `
    <div class="mt-5 mb-6 text-center">
      <i class="fa-duotone fa-info icon-color-duotone-1 text-6xl mt-4"></i>
      <h1>Important update</h1>
      <h3>
        Please refer to our
        <a href="https://t.me/Dehubannouncements/113">official announcement</a>
      </h3>
      <h5>TLDR;</h5>
      <p>
        We're upgrading the contract,
        <b>V3 comes with new tokenomics and everything else remains the same</b
        >.
      </p>
      <div>
        Private Liquidity generation event sold out in 2 days
        <i
          >(LGE is not a presale as all funds go into liquidity pools for
          traders)</i
        >.
      </div>
      <p>
        Open to all holders with <b>referral system</b> live on our marketplace
        giving you the
        <b>chance to earn a 10% bonus on purchases from referral</b>.
      </p>

      <p>
        Don't miss the public LGE on the 14th and refer to our announcement page
        starting at Announcement number 113
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {
  ngOnInit() {}
}

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
        this.dialogService.open(InfoComponent, {
          showHeader: true,
          header: 'Information',
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
