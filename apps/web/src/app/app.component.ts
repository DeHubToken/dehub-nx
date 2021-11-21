import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { Env } from '@dehub/shared/config';
import { MenuMode, ThemeMode } from '@dehub/shared/models';
import { isThemeSwitchKey } from '@dehub/shared/utils';
import { PrimeNGConfig } from 'primeng/api';
import { ThemeService } from './theme.service';
@Component({
  selector: 'dhb-root',
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  menuMode: MenuMode = 'horizontal';

  darkMode: ThemeMode = 'dark';
  topbarTheme: ThemeMode = 'dark';
  menuTheme: ThemeMode = 'dark';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(APP_BASE_HREF) private baseHref: string,
    @Inject(EnvToken) private env: Env,
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService
  ) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (isThemeSwitchKey(event)) {
      this.setMode(this.themeService.toggleTheme());
    }
  }

  ngOnInit() {
    this.loadManifest();
    this.loadIcon();
    this.loadThemes();
    this.primengConfig.ripple = true;
  }

  private setMode(mode: ThemeMode) {
    this.darkMode = mode;
    this.topbarTheme = mode;
    this.menuTheme = mode;
  }

  /**
   * Loads the themes runtime
   * Docs: https://egghead.io/lessons/angular-lazy-load-css-at-runtime-with-the-angular-cli
   *
   * <link id="theme" rel="stylesheet" type="text/css" href="web/theme.css" />
   * <link id="layout" rel="stylesheet" type="text/css" href="web/layout.css" />
   */
  private loadThemes() {
    const headEl = this.document.getElementsByTagName('head')[0];
    const themeLinkEl = this.document.createElement('link');
    const layoutLinkEl = this.document.createElement('link');

    const subPath = `${this.env.production ? `${this.baseHref}/` : ''}`;

    themeLinkEl.id = 'theme';
    themeLinkEl.rel = 'stylesheet';
    themeLinkEl.type = 'text/css';
    themeLinkEl.href = `${subPath}theme.css`;
    headEl.appendChild(themeLinkEl);

    layoutLinkEl.id = 'layout';
    layoutLinkEl.rel = 'stylesheet';
    layoutLinkEl.type = 'text/css';
    layoutLinkEl.href = `${subPath}layout.css`;
    headEl.appendChild(layoutLinkEl);
  }
  /**
   * <link
   *   rel="icon"
   *   type="image/x-icon"
   *   href="web/assets/dehub/icon-dehub-white.svg"
   * />
   */
  private loadIcon() {
    const headEl = this.document.getElementsByTagName('head')[0];
    const iconLinkEl = this.document.createElement('link');

    const subPath = `${this.env.production ? `${this.baseHref}/` : ''}`;

    iconLinkEl.rel = 'icon';
    iconLinkEl.type = 'image/x-icon';
    iconLinkEl.href = `${subPath}assets/dehub/icon-dehub-white.svg`;
    headEl.appendChild(iconLinkEl);
  }

  /**
   * <link rel="manifest" href="web/manifest.webmanifest" />
   */
  private loadManifest() {
    if (!this.env.production) return;

    const headEl = this.document.getElementsByTagName('head')[0];
    const manifestLinkEl = this.document.createElement('link');

    const subPath = `${this.env.production ? `${this.baseHref}/` : ''}`;

    manifestLinkEl.rel = 'manifest';
    manifestLinkEl.href = `${subPath}manifest.webmanifest`;
    headEl.appendChild(manifestLinkEl);
  }
}
