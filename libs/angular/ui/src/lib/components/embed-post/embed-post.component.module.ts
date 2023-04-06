import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { SafeHtmlPipeModule } from '../../pipes/safe-html';
import { EmbedPostComponent } from './embed-post.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    ContentfulDraftDirectiveModule,
    SafeHtmlPipeModule,
    EmbedPostComponent,
  ],
  exports: [EmbedPostComponent],
})
export class EmbedPostModule {}
