import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { EnvToken } from '../models';

@Injectable()
export class CoreService {
  public path = `${this.env.baseUrl}`;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(EnvToken) private env: SharedEnv
  ) {}

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
    iconLinkEl.href = `${this.path}/${iconWithAssetPath}`;
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
    manifestLinkEl.href = `${this.path}/${manifestFile}`;
    headEl.appendChild(manifestLinkEl);
  }
}
