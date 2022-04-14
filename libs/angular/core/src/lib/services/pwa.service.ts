import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { SwUpdateConfig } from '@dehub/shared/config';
import { MessageService } from 'primeng/api';
import { filter, takeWhile } from 'rxjs/operators';
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
      .appStableAwareInterval$(SwUpdateConfig.checkForUpdateInterval)
      .subscribe(() => this.swUpdate.checkForUpdate());

    // Service Worker Version Ready
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
        ? SwUpdateConfig.msgAvailableDetailWarn
        : SwUpdateConfig.msgAvailableDetailInfo;

    this.messageService.add({
      key: SwUpdateConfig.componentKey,
      sticky: true,
      closable: false,
      severity,
      summary: SwUpdateConfig.msgAvailableSummary,
      detail,
      data: { hash: hash?.slice(-4) },
    });
  }

  activateUpdate() {
    this.swUpdate.activateUpdate().finally(() => window.location.reload());
  }

  cancelUpdate() {
    this.messageService.clear(SwUpdateConfig.componentKey);
  }

  unsubscribeNotifications() {
    this.isAlive = false;
  }
}
