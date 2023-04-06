import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnnouncementFragment } from '@dehub/shared/model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';
import { ContentfulRichMarkupPipe } from '../../pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { NgFor, NgClass, DatePipe } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'dhb-announcement',
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
  standalone: true,
  imports: [
    SwiperModule,
    NgFor,
    ContentfulDraftDirective,
    NgClass,
    DatePipe,
    ContentfulRichMarkupPipe,
    SafeHtmlPipe,
  ],
})
export class AnnouncementComponent implements OnInit {
  announcements = (
    this.config.data as { announcements: AnnouncementFragment[] }
  ).announcements;

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit() {}
}
