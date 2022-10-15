import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnnouncementFragment } from '@dehub/shared/model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'dhb-announcement',
  template: `
    <swiper
      [navigation]="false"
      [slidesPerView]="'auto'"
      [grabCursor]="true"
      [direction]="'vertical'"
    >
      <ng-container *ngFor="let announcement of announcements">
        <ng-template swiperSlide>
          <div [dhbContentfulDraft]="announcement.sys" class="mt-5 mb-6">
            <!-- Header -->
            <div
              class="flex flex-row align-items-center justify-content-center gap-3"
            >
              <span class="text-xl text-bold">{{
                announcement.start | date
              }}</span>
              <i
                [ngClass]="
                  announcement.icon ||
                  'fa-megaphone' + ' fa-duotone icon-color-duotone-1 text-6xl'
                "
              ></i>
            </div>
            <h1 class="text-center">{{ announcement.header }}</h1>

            <!-- Content -->
            <div
              [innerHtml]="
                announcement.content?.json
                  | dhbContentfulRichMarkup
                  | dhbSafeHtml
              "
            ></div>
          </div>
        </ng-template>
      </ng-container>
    </swiper>
  `,
  styles: [
    `
      /* @import '~swiper/scss'; */
      /* @import '~swiper/css/effect-cards'; */
      /* @import '~@dehub/swiper/dhb_swiper_navigation'; */
      /* @import '~swiper/scss/pagination'; */
      /* @import '~swiper/scss/lazy'; */
      /* @import '~swiper/scss/navigation'; */

      /* dhb-announcement {
        height: 100%;
        & > div {
          height: 100%;
        }
        .swiper {
          &.announcements {
            padding-bottom: 0 !important;
          }
        }
      } */
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent implements OnInit {
  announcements = (
    this.config.data as { announcements: AnnouncementFragment[] }
  ).announcements;

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit() {}
}
