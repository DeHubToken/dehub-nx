import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulRichMarkupPipe } from './contentful-rich-markup.pipe';

@NgModule({
  imports: [CommonModule, ContentfulRichMarkupPipe],
  exports: [ContentfulRichMarkupPipe],
})
export class ContentfulRichMarkupPipeModule {}
