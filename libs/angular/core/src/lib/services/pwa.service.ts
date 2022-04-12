import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import {
  swCheckForUpdateInterval,
  swUpdateAvailableComponentKey,
} from '@dehub/shared/config';
import { MessageService } from 'primeng/api';
import { filter, takeWhile } from 'rxjs/operators';
import { CoreService } from '.';

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
    this.coreService
      .appStableAwareInterval$(swCheckForUpdateInterval)
      .subscribe(() => this.swUpdate.checkForUpdate());

    // Service Worker update available
    this.swUpdate.versionUpdates
      .pipe(
        takeWhile(() => this.isAlive),
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(() => this.triggerSwUpdateAvailable());
  }

  triggerSwUpdateAvailable() {
    this.messageService.add({
      key: swUpdateAvailableComponentKey,
      sticky: true,
      closable: false,
      severity: 'info',
      summary: 'A new version of the website is available.',
      detail: 'Please update.',
    });
  }

  activateUpdate() {
    this.messageService.clear();
    this.swUpdate.activateUpdate().then(() => window.location.reload());
  }

  cancelUpdate() {
    this.messageService.clear(swUpdateAvailableComponentKey);
  }

  unsubscribeNotifications() {
    this.isAlive = false;
  }
}
