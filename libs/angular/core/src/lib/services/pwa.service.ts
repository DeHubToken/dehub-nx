import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { serviceWorkerConfig } from '@dehub/shared/model';
import { MessageService } from 'primeng/api';
import { filter, takeWhile } from 'rxjs';
import { CoreService } from './core.service';

@Injectable({ providedIn: 'root' })
export class PwaService {
  private isAlive = true;

  constructor(
    private swUpdate: SwUpdate,
    private coreService: CoreService,
    private messageService: MessageService
  ) {}

  subscribeForNewUpdates() {
    if (this.swUpdate === null || !this.swUpdate.isEnabled) return;

    // Service Worker check for update
    // docs: https://angular.io/guide/service-worker-communications#checking-for-updates
    this.coreService
      .appStableAwareInterval$(serviceWorkerConfig.checkForUpdateInterval)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.swUpdate.checkForUpdate());

    // Service Worker Version Ready
    // docs: https://angular.io/guide/service-worker-communications#updating-to-the-latest-version
    this.swUpdate.versionUpdates
      .pipe(
        takeWhile(() => this.isAlive),
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(({ latestVersion: { hash } }) =>
        this.triggerSwUpdateAvailable('info', hash)
      );

    // Service Worker unrecoverable state
    // docs: https://angular.io/guide/service-worker-communications#handling-an-unrecoverable-state
    this.swUpdate.unrecoverable
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.triggerSwUpdateAvailable('warn'));
  }

  triggerSwUpdateAvailable(
    severity: 'info' | 'warn' | 'error' | 'success',
    hash?: string
  ) {
    const detail =
      severity === 'warn'
        ? serviceWorkerConfig.msgAvailableDetailWarn
        : serviceWorkerConfig.msgAvailableDetailInfo;

    this.messageService.add({
      key: serviceWorkerConfig.componentKey,
      sticky: true,
      closable: false,
      severity,
      summary: serviceWorkerConfig.msgAvailableSummary,
      detail,
      data: { hash: hash?.slice(-4) },
    });
  }

  activateUpdate() {
    this.swUpdate.activateUpdate().finally(() => window.location.reload());
  }

  cancelUpdate() {
    this.messageService.clear(serviceWorkerConfig.componentKey);
  }

  unsubscribeNotifications() {
    this.isAlive = false;
  }
}
