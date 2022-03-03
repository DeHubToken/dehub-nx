import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ContentfulRichMarkupPipeModule } from '../../pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '../../pipes/safe-html';
import { ChartPostModule } from '../chart-post/chart-post.component.module';
import { EmbedPostModule } from '../embed-post/embed-post.component.module';
import { SectionPostComponent } from './section-post.component';

@NgModule({
  declarations: [SectionPostComponent],
  imports: [
    // Angular
    CommonModule,

    ChartPostModule,
    EmbedPostModule,

    // Libs
    ContentfulDraftDirectiveModule,
    ContentfulRichMarkupPipeModule,
    SafeHtmlPipeModule,
  ],
  exports: [SectionPostComponent],
})
export class SectionPostModule {}
