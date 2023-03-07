import { Inject, Injectable } from '@angular/core';
import { AnnouncementCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { AnnouncementComponent } from '@dehub/angular/ui/components/announcement';
import { AnnouncementFragment, SharedEnv } from '@dehub/shared/model';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, map, takeWhile } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private isAlive = true;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private dialogService: DialogService,
    private announcementCollectionService: AnnouncementCollectionService
  ) {}

  subscribeForAnnouncements() {
    this.announcementCollectionService
      .watch({
        now: new Date(),
        isPreview: this.env.contentful.isPreview,
      })
      .valueChanges.pipe(
        takeWhile(() => this.isAlive),
        filter(({ loading }) => !loading),
        map(
          ({ data: { announcementCollection } }) =>
            (announcementCollection?.items as AnnouncementFragment[]) ?? []
        ),
        filter(announcements => announcements.length > 0)
      )
      .subscribe(announcements => {
        this.dialogService.open(AnnouncementComponent, {
          data: { announcements },
          showHeader: true,
          header: 'Announcements',
          width: '620px',
          styleClass: 'bg-gradient-3 border-neon-1',
          closeOnEscape: true,
          dismissableMask: true,
          closable: true,
        });
      });
  }

  unsubscribeAnnouncements() {
    this.isAlive = false;
  }
}
