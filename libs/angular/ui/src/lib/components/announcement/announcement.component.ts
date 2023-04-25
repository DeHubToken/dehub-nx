import { DatePipe, NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnnouncementFragment } from '@dehub/shared/model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { ContentfulRichMarkupPipe } from '../../pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';

@Component({
  selector: 'dhb-announcement',
  standalone: true,
  imports: [
    // Angular
    NgFor,
    NgClass,
    DatePipe,
    // UI
    ContentfulDraftDirective,
    ContentfulRichMarkupPipe,
    SafeHtmlPipe,
    // 3rd Party
    SwiperModule,
  ],
  template: `
    <div class="mx-4">
      <swiper
        [navigation]="false"
        [slidesPerView]="'auto'"
        [direction]="'vertical'"
        [freeMode]="true"
        [scrollbar]="true"
        [mousewheel]="true"
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
                    (announcement.icon || 'fa-megaphone') +
                    ' fa-duotone icon-color-duotone-1 text-6xl'
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent implements OnInit {
  announcements = (
    this.config.data as { announcements: AnnouncementFragment[] }
  ).announcements;

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit() {}
}
