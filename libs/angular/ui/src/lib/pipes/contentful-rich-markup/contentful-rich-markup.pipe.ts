import { Pipe, PipeTransform } from '@angular/core';
import { Document } from '@contentful/rich-text-types';
import { richMarkupToHtmlString } from '@dehub/shared/utils';

@Pipe({ name: 'dhbContentfulRichMarkup', pure: true })
export class ContentfulRichMarkupPipe implements PipeTransform {
  constructor() {}

  transform(richTextDocument: Document) {
    return richMarkupToHtmlString(richTextDocument);
  }
}
