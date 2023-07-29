import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import {
  AssetFragment,
  ContentfulEntity,
  ContentfulImageLoaderParams,
  responsiveImageBreakpoints,
} from '@dehub/shared/model';

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

/** Generate image alt for Contentful Asset */
export const getContentfulImageAlt = (
  { description, title }: AssetFragment,
  fallbackAlt = 'dehub image'
) => {
  const alt = `${description ?? title}`;
  return `${alt.length > 1 ? alt : fallbackAlt}`;
};

/** Image srcset for responsive images based on Contentful Image API */
export const getContentfulImageSrcSet = (
  src: string,
  loaderParams?: ContentfulImageLoaderParams
) =>
  responsiveImageBreakpoints
    .map(
      breakpoint =>
        `${getContentfulImageApiQuery(
          src,
          loaderParams,
          breakpoint
        )} ${breakpoint}w`
    )
    .join(', ');

/**
 * Get image url based on Contentful Image API
 * Docs: https://www.contentful.com/developers/docs/references/images-api
 *
 * @param src the contentful asset src
 * @param loaderParams customisable image api params
 * @param width desired image width
 * @returns the contentful image url
 */
export const getContentfulImageApiQuery = (
  src: string,
  loaderParams?: ContentfulImageLoaderParams,
  width?: number
) => {
  const queryParams: string[] = [];

  // Custom Loader Params
  let lParams = loaderParams;

  // Default Loader Params
  lParams =
    lParams && lParams.format ? lParams : { ...lParams, format: 'avif' };

  // Quality: https://www.contentful.com/developers/docs/references/images-api/#/reference/image-manipulation/quality
  queryParams.push('q=75');

  // Width: https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/specify-width-&-height
  if (width) queryParams.push(`w=${width}`);

  // Loader Params: https://angular.io/guide/image-directive#the-loaderparams-property
  if (lParams) {
    const { cornerRadius, format } = lParams;

    // Format:  https://www.contentful.com/developers/docs/references/images-api/#/reference/changing-formats
    queryParams.push(`fm=${format}`);

    // Radius: https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/crop-rounded-corners-&-circle-elipsis
    if (cornerRadius) queryParams.push(`r=${cornerRadius}`);
  }

  return `${src}?${queryParams.join('&')}`;
};
