import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { SafeHtmlPipeModule } from '../../pipes/safe-html';
import { EmbedPostComponent } from './embed-post.component';

@NgModule({
  declarations: [EmbedPostComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    SafeHtmlPipeModule,
  ],
  exports: [EmbedPostComponent],
})
export class EmbedPostModule {}
