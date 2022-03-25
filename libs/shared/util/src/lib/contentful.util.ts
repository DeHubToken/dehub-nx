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

export const resolveColumnWidth = (width?: string, alignCenter = false) => {
  let col = '';
  let common = ' col-12 sm:col-12 md:col-12 ';
  let offsetCommon = ' col-offset-0 ';

  switch (width) {
    case 'narrow':
      col += common += 'xl:col-4';
      if (alignCenter) {
        col += offsetCommon += 'xl:col-offset-4';
      }
      break;
    case 'wide':
      col += common += 'xl:col-6';
      if (alignCenter) {
        col += offsetCommon += 'xl:col-offset-3';
      }
      break;
    case 'wider':
      col += common += 'xl:col-8';
      if (alignCenter) {
        col += offsetCommon += 'xl:col-offset-2';
      }
      break;
    case 'full':
      col += 'col-12';
      break;
    default:
      col += 'col-12';
  }

  return col;
};
