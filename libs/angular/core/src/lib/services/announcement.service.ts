import { Inject, Injectable } from '@angular/core';
import { EnvToken, IAnnouncementService } from '@dehub/angular/model';
import {
  AnnouncementFragment,
  SharedEnv,
  pollInterval,
} from '@dehub/shared/model';
import { filter, map, switchMap, timer } from 'rxjs';
import {
  AnnouncementCollectionCountService,
  AnnouncementCollectionService,
} from './website-contentful.service';

@Injectable({ providedIn: 'root' })
export class AnnouncementService implements IAnnouncementService {
  getAnnouncements$ = this.getAnnouncements;

  announcementsCountPoll$ = timer(0, pollInterval).pipe(
    switchMap(() => this.getAnnouncementsCount())
  );

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private announcementCollectionService: AnnouncementCollectionService,
    private announcementCollectionPollService: AnnouncementCollectionCountService
  ) {}

  private getAnnouncements() {
    return this.announcementCollectionService
      .fetch({
        now: new Date(),
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        filter(({ loading }) => !loading),
        map(
          ({ data: { announcementCollection } }) =>
            (announcementCollection?.items as AnnouncementFragment[]) ?? []
        ),
        filter(announcements => announcements.length > 0)
      );
  }

  private getAnnouncementsCount() {
    return this.announcementCollectionPollService
      .fetch({
        now: new Date(),
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        filter(({ loading }) => !loading),
        map(
          ({ data: { announcementCollection } }) =>
            announcementCollection?.total ?? 0
        )
      );
  }
}
