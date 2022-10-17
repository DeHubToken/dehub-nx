import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ContentfulRichMarkupPipeModule } from '../../pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '../../pipes/safe-html';
import { AnnouncementComponent } from './announcement.component';
@NgModule({
  declarations: [AnnouncementComponent],
  imports: [
    // Angular
    CommonModule,

    // Swiper
    SwiperModule,

    // Libs
    ContentfulDraftDirectiveModule,
    ContentfulRichMarkupPipeModule,
    SafeHtmlPipeModule,
  ],
  exports: [AnnouncementComponent],
})
export class AnnouncementModule {}
