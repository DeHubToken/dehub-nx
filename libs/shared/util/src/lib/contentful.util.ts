import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';

export const richMarkupToHtmlString = (richTextDocument: Document) => {
  const richOptions: Options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node, next) =>
        `<ul class="pl-4 mb-0">${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) =>
        `<ol class="pl-3 mb-0">${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node, next) =>
        `<li class="pb-2">${next(node.content)}</li>`,
    },
  };
  return documentToHtmlString(richTextDocument, richOptions);
};
