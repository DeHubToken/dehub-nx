import { EntryProps, KeyValueMap } from 'contentful-management';

export type ContentfulEntity = EntryProps<KeyValueMap>;

/**
 * Contentful Image Formats
 * Docs: https://www.contentful.com/developers/docs/references/images-api/#/reference/changing-formats/image-format
 */
type ContentfulImageFormat = 'jpg' | 'png' | 'webp' | 'gif' | 'avif';

export type ContentfulImageLoaderParams = {
  format?: ContentfulImageFormat;
  cornerRadius?: number;
  height?: number;
};

/**
 * Responsive image breakpoints
 * Docs: https://angular.io/guide/image-directive#responsive-images
 */
export const responsiveImageBreakpoints = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
];
