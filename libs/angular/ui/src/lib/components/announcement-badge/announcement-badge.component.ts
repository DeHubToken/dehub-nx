import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  AnnouncementToken,
  EnvToken,
  IAnnouncementService,
} from '@dehub/angular/model';
import { SharedEnv, animationDuration } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { rubberBandOnEnterAnimation } from 'angular-animations';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';
import { BehaviorSubject, first, map, switchMap } from 'rxjs';
import { AnnouncementComponent } from '../announcement/announcement.component';

@Component({
  selector: 'dhb-announcement-badge',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    // PrimeNG
    BadgeModule,
    ButtonModule,
    RippleModule,
    // 3rd Party
    LetModule,
  ],
  template: `
    <ng-container *rxLet="announcementBadge$ as announcementBadge">
      <a
        *ngIf="announcementBadge.isAvailable"
        pRipple
        (click)="showAnnouncements()"
        title="Show Announcements"
        class="cursor-pointer"
      >
        <i
          pBadge
          [value]="announcementBadge.count"
          [@rubberBandOnEnter]
          class="fad fa-megaphone text-4xl"
        ></i>
      </a>
    </ng-container>
  `,
  animations: [
    rubberBandOnEnterAnimation({
      anchor: 'rubberBandOnEnter',
      duration: 2 * animationDuration,
      delay: animationDuration,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBadgeComponent implements OnInit {
  private dialogVisibleSubject = new BehaviorSubject<boolean>(false);

  announcementBadge$ =
    // Show or hide announcement badge as user can close the dialog anytime
    this.dialogVisibleSubject.asObservable().pipe(
      // Use poll if dialog is hidden otherwise read first count value
      switchMap(announcementsVisible =>
        (announcementsVisible
          ? this.announcementService.announcementsCountPoll$.pipe(first())
          : this.announcementService.announcementsCountPoll$
        ).pipe(
          map(announcementsCount => ({
            announcementsCount,
            announcementsVisible,
          }))
        )
      ),
      map(({ announcementsCount, announcementsVisible }) => ({
        count: `${announcementsCount}`,
        isAvailable: announcementsCount > 0 && !announcementsVisible,
      }))
    );

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(AnnouncementToken)
    private announcementService: IAnnouncementService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    // Hide announcements for easier dev flow (save time for you to close the dialog :)
    if (this.env.env !== 'dev') this.showAnnouncements();
  }

  showAnnouncements() {
    const subscription = this.announcementService
      .getAnnouncements$()
      .subscribe(announcements => {
        this.dialogVisibleSubject.next(true);

        // Open dialog
        this.dialogService
          .open(AnnouncementComponent, {
            data: { announcements },
            showHeader: true,
            header: `${announcements.length} Announcements`,
            width: '620px',
            styleClass: 'bg-gradient-3 border-neon-1',
            closeOnEscape: true,
            dismissableMask: true,
            closable: true,
          })
          .onClose.subscribe(() => {
            this.dialogVisibleSubject.next(false);
            subscription.unsubscribe();
          });
      });
  }
}
