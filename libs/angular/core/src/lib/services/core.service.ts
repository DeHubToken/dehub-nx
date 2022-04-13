import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Inject, Injectable } from '@angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { interval, SchedulerLike } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { EnvToken } from '../models';

@Injectable({ providedIn: 'root' })
export class CoreService {
  public path = `${this.env.baseUrl}`;

  /**
   * All RxJS timers should start after this stable state
   * Source: https://angular.io/api/core/ApplicationRef#isstable-examples-and-caveats
   */
  private appIsStable$ = this.appRef.isStable.pipe(
    first(isStable => isStable === true)
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(EnvToken) private env: SharedEnv,
    private appRef: ApplicationRef
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
   * <link rel="manifest" href="path/dehub.webmanifest" />
   */
  loadManifest(manifestFile = 'dehub.webmanifest') {
    if (!this.env.production) return;

    const headEl = this.document.getElementsByTagName('head')[0];
    const manifestLinkEl = this.document.createElement('link');

    manifestLinkEl.rel = 'manifest';
    manifestLinkEl.href = `${this.path}/${manifestFile}`;
    headEl.appendChild(manifestLinkEl);
  }

  appStableAwareInterval$(period?: number, scheduler?: SchedulerLike) {
    return this.appIsStable$.pipe(switchMap(() => interval(period, scheduler)));
  }
}
