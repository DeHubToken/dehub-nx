import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { ContentfulEntity } from '@dehub/shared/model';

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

export const richMarkupToPlainString = (richTextDocument: Document) => {
  return documentToPlainTextString(richTextDocument, '\n');
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

export const resolveButtonStyle = (
  type?: string,
  style?: string,
  size?: string
) => {
  let classes = ``;
  if (type) {
    classes += ` p-button-${type}`;
  }
  if (style) {
    classes += ` p-button-${style}`;
  }
  switch (size) {
    case 'small':
      classes += ' p-button-sm';
      break;
    case 'large':
      classes += ' p-button-lg';
      break;
    default:
      break;
  }

  return classes;
};

/**
 * Entry state detection APIs
 * Docs: https://www.contentful.com/developers/docs/tutorials/general/determine-entry-asset-state/
 */

/** Detect if an entity is in draft state */
export const isContentfulEntityDraft = (entity: ContentfulEntity) =>
  !entity.sys.publishedVersion;

/** Detect if an entity is in changed state */
export const isContentfulEntityChanged = (entity: ContentfulEntity) =>
  !!entity.sys.publishedVersion &&
  entity.sys.version >= entity.sys.publishedVersion + 2;

/** Detect if an entity is in published state */
export const isContentfulEntityPublished = (entity: ContentfulEntity) =>
  !!entity.sys.publishedVersion &&
  entity.sys.version == entity.sys.publishedVersion + 1;

/** Detect if an entity is in archived state */
export const isContentfulEntityArchived = (entity: ContentfulEntity) =>
  !!entity.sys.archivedVersion;
