import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Env } from '@dehub/shared/config';
import { EnvToken } from '../models';

@Injectable({ providedIn: 'root' })
export class CoreService {
  public path = `${this.env.production ? `${this.baseHref}/` : ''}`;

  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    @Inject(DOCUMENT) private document: Document,
    @Inject(EnvToken) private env: Env
  ) {}

  /**
   * Loads the theme which consists of the theme and layout based on Freya.
   * Docs: https://egghead.io/lessons/angular-lazy-load-css-at-runtime-with-the-angular-cli
   *
   * <link id="theme" rel="stylesheet" type="text/css" href="path/theme.css" />
   * <link id="layout" rel="stylesheet" type="text/css" href="path/layout.css" />
   */
  loadTheme(themeCss = 'theme.css', layoutCss = 'layout.css') {
    const headEl = this.document.getElementsByTagName('head')[0];
    const themeLinkEl = this.document.createElement('link');
    const layoutLinkEl = this.document.createElement('link');

    themeLinkEl.id = 'theme';
    themeLinkEl.rel = 'stylesheet';
    themeLinkEl.type = 'text/css';
    themeLinkEl.href = `${this.path}${themeCss}`;
    headEl.appendChild(themeLinkEl);

    layoutLinkEl.id = 'layout';
    layoutLinkEl.rel = 'stylesheet';
    layoutLinkEl.type = 'text/css';
    layoutLinkEl.href = `${this.path}${layoutCss}`;
    headEl.appendChild(layoutLinkEl);
  }

  /**
   * Loads the icon.
   *
   * <link
   *   rel="icon"
   *   type="image/x-icon"
   *   href="path/assets/dehub/icon-dehub-white.svg"
   * />
   */
  loadIcon(iconWithAssetPath = 'assets/dehub/icon-dehub-white.svg') {
    const headEl = this.document.getElementsByTagName('head')[0];
    const iconLinkEl = this.document.createElement('link');

    iconLinkEl.rel = 'icon';
    iconLinkEl.type = 'image/x-icon';
    iconLinkEl.href = `${this.path}${iconWithAssetPath}`;
    headEl.appendChild(iconLinkEl);
  }

  /**
   * Loads the manifest for PWA.
   *
   * <link rel="manifest" href="path/manifest.webmanifest" />
   */
  loadManifest(manifestFile = 'manifest.webmanifest') {
    if (!this.env.production) return;

    const headEl = this.document.getElementsByTagName('head')[0];
    const manifestLinkEl = this.document.createElement('link');

    manifestLinkEl.rel = 'manifest';
    manifestLinkEl.href = `${this.path}${manifestFile}`;
    headEl.appendChild(manifestLinkEl);
  }

  setTheme(themeCss: string, layoutCss: string) {
    const themeLink = this.document.getElementById(
      'theme'
    ) as HTMLLinkElement | null;
    const layoutLink = this.document.getElementById(
      'layout'
    ) as HTMLLinkElement | null;

    if (themeLink) themeLink.href = `${this.path}${themeCss}`;
    if (layoutLink) layoutLink.href = `${this.path}${layoutCss}`;
  }
}
