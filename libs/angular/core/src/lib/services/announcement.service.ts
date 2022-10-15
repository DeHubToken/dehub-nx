import { Injectable } from '@angular/core';
import { AnnouncementComponent } from '@dehub/angular/ui/components/announcement';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private isAlive = true;

  constructor(private dialogService: DialogService) {}

  subscribeForAnnouncements() {
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

  unsubscribeAnnouncements() {
    this.isAlive = false;
  }
}
