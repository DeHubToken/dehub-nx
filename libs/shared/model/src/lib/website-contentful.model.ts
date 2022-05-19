/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface Asset {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetContentTypeArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetFileNameArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetHeightArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetSizeArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetUrlArgs {
  locale?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ImageTransformOptions>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface AssetCollection {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface AssetFilter {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
}

export interface AssetLinkingCollections {
  __typename?: 'AssetLinkingCollections';
  basicPostCollection?: Maybe<BasicPostCollection>;
  entryCollection?: Maybe<EntryCollection>;
  featurePostCollection?: Maybe<FeaturePostCollection>;
  grandPostCollection?: Maybe<GrandPostCollection>;
  personPostCollection?: Maybe<PersonPostCollection>;
  productCollection?: Maybe<ProductCollection>;
  thumbnailPostCollection?: Maybe<ThumbnailPostCollection>;
}

export interface AssetLinkingCollectionsBasicPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsFeaturePostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsGrandPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsPersonPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsProductCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsThumbnailPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPost extends Entry {
  __typename?: 'BasicPost';
  category?: Maybe<BasicPostCategory>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<BasicPostDescription>;
  linkedFrom?: Maybe<BasicPostLinkingCollections>;
  mainPicture?: Maybe<Asset>;
  slug?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostCategoryArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostMainPictureArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostSlugArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostSummaryArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A category for the basic post allows filtering basic posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPostCategory) */
export interface BasicPostCategory extends Entry {
  __typename?: 'BasicPostCategory';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<BasicPostCategoryLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** A category for the basic post allows filtering basic posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPostCategory) */
export interface BasicPostCategoryLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A category for the basic post allows filtering basic posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPostCategory) */
export interface BasicPostCategoryNameArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface BasicPostCategoryCollection {
  __typename?: 'BasicPostCategoryCollection';
  items: Array<Maybe<BasicPostCategory>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface BasicPostCategoryFilter {
  AND?: InputMaybe<Array<InputMaybe<BasicPostCategoryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BasicPostCategoryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface BasicPostCategoryLinkingCollections {
  __typename?: 'BasicPostCategoryLinkingCollections';
  basicPostCollection?: Maybe<BasicPostCollection>;
  entryCollection?: Maybe<EntryCollection>;
  pageSectionBasicPostsCollection?: Maybe<PageSectionBasicPostsCollection>;
}

export interface BasicPostCategoryLinkingCollectionsBasicPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface BasicPostCategoryLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface BasicPostCategoryLinkingCollectionsPageSectionBasicPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum BasicPostCategoryOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface BasicPostCollection {
  __typename?: 'BasicPostCollection';
  items: Array<Maybe<BasicPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface BasicPostDescription {
  __typename?: 'BasicPostDescription';
  json: Scalars['JSON'];
  links: BasicPostDescriptionLinks;
}

export interface BasicPostDescriptionAssets {
  __typename?: 'BasicPostDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
}

export interface BasicPostDescriptionEntries {
  __typename?: 'BasicPostDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
}

export interface BasicPostDescriptionLinks {
  __typename?: 'BasicPostDescriptionLinks';
  assets: BasicPostDescriptionAssets;
  entries: BasicPostDescriptionEntries;
}

export interface BasicPostFilter {
  AND?: InputMaybe<Array<InputMaybe<BasicPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BasicPostFilter>>>;
  category?: InputMaybe<CfBasicPostCategoryNestedFilter>;
  category_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  mainPicture_exists?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  summary?: InputMaybe<Scalars['String']>;
  summary_contains?: InputMaybe<Scalars['String']>;
  summary_exists?: InputMaybe<Scalars['Boolean']>;
  summary_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  summary_not?: InputMaybe<Scalars['String']>;
  summary_not_contains?: InputMaybe<Scalars['String']>;
  summary_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface BasicPostLinkingCollections {
  __typename?: 'BasicPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionBasicPostsCollection?: Maybe<PageSectionBasicPostsCollection>;
}

export interface BasicPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface BasicPostLinkingCollectionsPageSectionBasicPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum BasicPostOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToAction extends Entry {
  __typename?: 'CallToAction';
  contentfulMetadata: ContentfulMetadata;
  externalLink?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<CallToActionLinkingCollections>;
  routerLink?: Maybe<Scalars['JSON']>;
  size?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  sys: Sys;
  type?: Maybe<Scalars['String']>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionExternalLinkArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionIconArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionLabelArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionRouterLinkArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionSizeArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionStyleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A call to action reusable element. Link, button, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/callToAction) */
export interface CallToActionTypeArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface CallToActionCollection {
  __typename?: 'CallToActionCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface CallToActionFilter {
  AND?: InputMaybe<Array<InputMaybe<CallToActionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CallToActionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  external_link?: InputMaybe<Scalars['String']>;
  external_link_contains?: InputMaybe<Scalars['String']>;
  external_link_exists?: InputMaybe<Scalars['Boolean']>;
  external_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  external_link_not?: InputMaybe<Scalars['String']>;
  external_link_not_contains?: InputMaybe<Scalars['String']>;
  external_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon?: InputMaybe<Scalars['String']>;
  icon_contains?: InputMaybe<Scalars['String']>;
  icon_exists?: InputMaybe<Scalars['Boolean']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_not?: InputMaybe<Scalars['String']>;
  icon_not_contains?: InputMaybe<Scalars['String']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label?: InputMaybe<Scalars['String']>;
  label_contains?: InputMaybe<Scalars['String']>;
  label_exists?: InputMaybe<Scalars['Boolean']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_not?: InputMaybe<Scalars['String']>;
  label_not_contains?: InputMaybe<Scalars['String']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  routerLink_exists?: InputMaybe<Scalars['Boolean']>;
  size?: InputMaybe<Scalars['String']>;
  size_contains?: InputMaybe<Scalars['String']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  size_not?: InputMaybe<Scalars['String']>;
  size_not_contains?: InputMaybe<Scalars['String']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  style?: InputMaybe<Scalars['String']>;
  style_contains?: InputMaybe<Scalars['String']>;
  style_exists?: InputMaybe<Scalars['Boolean']>;
  style_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  style_not?: InputMaybe<Scalars['String']>;
  style_not_contains?: InputMaybe<Scalars['String']>;
  style_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  type?: InputMaybe<Scalars['String']>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_exists?: InputMaybe<Scalars['Boolean']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_not?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface CallToActionLinkingCollections {
  __typename?: 'CallToActionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  footerCollection?: Maybe<FooterCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface CallToActionLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsFooterCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface CallToActionLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum CallToActionOrder {
  ExternalLinkAsc = 'external_link_ASC',
  ExternalLinkDesc = 'external_link_DESC',
  IconAsc = 'icon_ASC',
  IconDesc = 'icon_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  StyleAsc = 'style_ASC',
  StyleDesc = 'style_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
}

/** A chart graphic post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/chartPost) */
export interface ChartPost extends Entry {
  __typename?: 'ChartPost';
  chartData?: Maybe<Scalars['JSON']>;
  chartOptions?: Maybe<Scalars['JSON']>;
  chartType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  hideTitle?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<ChartPostLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** A chart graphic post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/chartPost) */
export interface ChartPostChartDataArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A chart graphic post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/chartPost) */
export interface ChartPostChartOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A chart graphic post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/chartPost) */
export interface ChartPostChartTypeArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A chart graphic post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/chartPost) */
export interface ChartPostHideTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A chart graphic post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/chartPost) */
export interface ChartPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A chart graphic post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/chartPost) */
export interface ChartPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface ChartPostCollection {
  __typename?: 'ChartPostCollection';
  items: Array<Maybe<ChartPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface ChartPostFilter {
  AND?: InputMaybe<Array<InputMaybe<ChartPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ChartPostFilter>>>;
  chartData_exists?: InputMaybe<Scalars['Boolean']>;
  chartOptions_exists?: InputMaybe<Scalars['Boolean']>;
  chartType?: InputMaybe<Scalars['String']>;
  chartType_contains?: InputMaybe<Scalars['String']>;
  chartType_exists?: InputMaybe<Scalars['Boolean']>;
  chartType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  chartType_not?: InputMaybe<Scalars['String']>;
  chartType_not_contains?: InputMaybe<Scalars['String']>;
  chartType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  hideTitle?: InputMaybe<Scalars['Boolean']>;
  hideTitle_exists?: InputMaybe<Scalars['Boolean']>;
  hideTitle_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface ChartPostLinkingCollections {
  __typename?: 'ChartPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  sectionPostCollection?: Maybe<SectionPostCollection>;
}

export interface ChartPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface ChartPostLinkingCollectionsSectionPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum ChartPostOrder {
  ChartTypeAsc = 'chartType_ASC',
  ChartTypeDesc = 'chartType_DESC',
  HideTitleAsc = 'hideTitle_ASC',
  HideTitleDesc = 'hideTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export interface ContentfulMetadata {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
}

export interface ContentfulMetadataFilter {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
}

export interface ContentfulMetadataTagsFilter {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export interface ContentfulTag {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPost extends Entry {
  __typename?: 'DappPost';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  iconTitle?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<DappPostLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  urlToDapp?: Maybe<Scalars['String']>;
  urlToLearnMore?: Maybe<Scalars['String']>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPostDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPostIconArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPostIconTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPostUrlToDappArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A special post to link to a specific D`App. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/dappPost) */
export interface DappPostUrlToLearnMoreArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface DappPostCollection {
  __typename?: 'DappPostCollection';
  items: Array<Maybe<DappPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface DappPostFilter {
  AND?: InputMaybe<Array<InputMaybe<DappPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DappPostFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon?: InputMaybe<Scalars['String']>;
  iconTitle?: InputMaybe<Scalars['String']>;
  iconTitle_contains?: InputMaybe<Scalars['String']>;
  iconTitle_exists?: InputMaybe<Scalars['Boolean']>;
  iconTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  iconTitle_not?: InputMaybe<Scalars['String']>;
  iconTitle_not_contains?: InputMaybe<Scalars['String']>;
  iconTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_contains?: InputMaybe<Scalars['String']>;
  icon_exists?: InputMaybe<Scalars['Boolean']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_not?: InputMaybe<Scalars['String']>;
  icon_not_contains?: InputMaybe<Scalars['String']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  urlToDapp?: InputMaybe<Scalars['String']>;
  urlToDapp_contains?: InputMaybe<Scalars['String']>;
  urlToDapp_exists?: InputMaybe<Scalars['Boolean']>;
  urlToDapp_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  urlToDapp_not?: InputMaybe<Scalars['String']>;
  urlToDapp_not_contains?: InputMaybe<Scalars['String']>;
  urlToDapp_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  urlToLearnMore?: InputMaybe<Scalars['String']>;
  urlToLearnMore_contains?: InputMaybe<Scalars['String']>;
  urlToLearnMore_exists?: InputMaybe<Scalars['Boolean']>;
  urlToLearnMore_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  urlToLearnMore_not?: InputMaybe<Scalars['String']>;
  urlToLearnMore_not_contains?: InputMaybe<Scalars['String']>;
  urlToLearnMore_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface DappPostLinkingCollections {
  __typename?: 'DappPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionDappPostsCollection?: Maybe<PageSectionDappPostsCollection>;
}

export interface DappPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface DappPostLinkingCollectionsPageSectionDappPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum DappPostOrder {
  IconTitleAsc = 'iconTitle_ASC',
  IconTitleDesc = 'iconTitle_DESC',
  IconAsc = 'icon_ASC',
  IconDesc = 'icon_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlToDappAsc = 'urlToDapp_ASC',
  UrlToDappDesc = 'urlToDapp_DESC',
  UrlToLearnMoreAsc = 'urlToLearnMore_ASC',
  UrlToLearnMoreDesc = 'urlToLearnMore_DESC',
}

/** A post for iframe or other type of embed code. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/embedPost) */
export interface EmbedPost extends Entry {
  __typename?: 'EmbedPost';
  aspectRatio?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  embedCode?: Maybe<Scalars['String']>;
  hideTitle?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<EmbedPostLinkingCollections>;
  scriptUrl?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** A post for iframe or other type of embed code. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/embedPost) */
export interface EmbedPostAspectRatioArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post for iframe or other type of embed code. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/embedPost) */
export interface EmbedPostEmbedCodeArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post for iframe or other type of embed code. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/embedPost) */
export interface EmbedPostHideTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post for iframe or other type of embed code. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/embedPost) */
export interface EmbedPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A post for iframe or other type of embed code. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/embedPost) */
export interface EmbedPostScriptUrlArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post for iframe or other type of embed code. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/embedPost) */
export interface EmbedPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface EmbedPostCollection {
  __typename?: 'EmbedPostCollection';
  items: Array<Maybe<EmbedPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface EmbedPostFilter {
  AND?: InputMaybe<Array<InputMaybe<EmbedPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EmbedPostFilter>>>;
  aspectRatio?: InputMaybe<Scalars['String']>;
  aspectRatio_contains?: InputMaybe<Scalars['String']>;
  aspectRatio_exists?: InputMaybe<Scalars['Boolean']>;
  aspectRatio_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  aspectRatio_not?: InputMaybe<Scalars['String']>;
  aspectRatio_not_contains?: InputMaybe<Scalars['String']>;
  aspectRatio_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  embedCode?: InputMaybe<Scalars['String']>;
  embedCode_contains?: InputMaybe<Scalars['String']>;
  embedCode_exists?: InputMaybe<Scalars['Boolean']>;
  embedCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  embedCode_not?: InputMaybe<Scalars['String']>;
  embedCode_not_contains?: InputMaybe<Scalars['String']>;
  embedCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  hideTitle?: InputMaybe<Scalars['Boolean']>;
  hideTitle_exists?: InputMaybe<Scalars['Boolean']>;
  hideTitle_not?: InputMaybe<Scalars['Boolean']>;
  scriptUrl?: InputMaybe<Scalars['String']>;
  scriptUrl_contains?: InputMaybe<Scalars['String']>;
  scriptUrl_exists?: InputMaybe<Scalars['Boolean']>;
  scriptUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  scriptUrl_not?: InputMaybe<Scalars['String']>;
  scriptUrl_not_contains?: InputMaybe<Scalars['String']>;
  scriptUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface EmbedPostLinkingCollections {
  __typename?: 'EmbedPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  sectionPostCollection?: Maybe<SectionPostCollection>;
}

export interface EmbedPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface EmbedPostLinkingCollectionsSectionPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum EmbedPostOrder {
  AspectRatioAsc = 'aspectRatio_ASC',
  AspectRatioDesc = 'aspectRatio_DESC',
  HideTitleAsc = 'hideTitle_ASC',
  HideTitleDesc = 'hideTitle_DESC',
  ScriptUrlAsc = 'scriptUrl_ASC',
  ScriptUrlDesc = 'scriptUrl_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export interface Entry {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
}

export interface EntryCollection {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface EntryFilter {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
}

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** A collection of FAQ questions. Use this to create separate groups of FAQ questions for different pages, sections, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqGroup) */
export interface FaqGroup extends Entry {
  __typename?: 'FaqGroup';
  contentfulMetadata: ContentfulMetadata;
  faqItemCollection?: Maybe<FaqGroupFaqItemCollection>;
  linkedFrom?: Maybe<FaqGroupLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** A collection of FAQ questions. Use this to create separate groups of FAQ questions for different pages, sections, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqGroup) */
export interface FaqGroupFaqItemCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** A collection of FAQ questions. Use this to create separate groups of FAQ questions for different pages, sections, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqGroup) */
export interface FaqGroupLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A collection of FAQ questions. Use this to create separate groups of FAQ questions for different pages, sections, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqGroup) */
export interface FaqGroupNameArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface FaqGroupCollection {
  __typename?: 'FaqGroupCollection';
  items: Array<Maybe<FaqGroup>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface FaqGroupFaqItemCollection {
  __typename?: 'FaqGroupFaqItemCollection';
  items: Array<Maybe<FaqItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface FaqGroupFilter {
  AND?: InputMaybe<Array<InputMaybe<FaqGroupFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FaqGroupFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  faqItemCollection_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface FaqGroupLinkingCollections {
  __typename?: 'FaqGroupLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionFaQsCollection?: Maybe<PageSectionFaQsCollection>;
}

export interface FaqGroupLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface FaqGroupLinkingCollectionsPageSectionFaQsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum FaqGroupOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** A single FAQ item which can be used in different FAQ collections. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqItem) */
export interface FaqItem extends Entry {
  __typename?: 'FaqItem';
  answer?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<FaqItemLinkingCollections>;
  question?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** A single FAQ item which can be used in different FAQ collections. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqItem) */
export interface FaqItemAnswerArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A single FAQ item which can be used in different FAQ collections. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqItem) */
export interface FaqItemLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A single FAQ item which can be used in different FAQ collections. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqItem) */
export interface FaqItemQuestionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface FaqItemCollection {
  __typename?: 'FaqItemCollection';
  items: Array<Maybe<FaqItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface FaqItemFilter {
  AND?: InputMaybe<Array<InputMaybe<FaqItemFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FaqItemFilter>>>;
  answer?: InputMaybe<Scalars['String']>;
  answer_contains?: InputMaybe<Scalars['String']>;
  answer_exists?: InputMaybe<Scalars['Boolean']>;
  answer_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  answer_not?: InputMaybe<Scalars['String']>;
  answer_not_contains?: InputMaybe<Scalars['String']>;
  answer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  question?: InputMaybe<Scalars['String']>;
  question_contains?: InputMaybe<Scalars['String']>;
  question_exists?: InputMaybe<Scalars['Boolean']>;
  question_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  question_not?: InputMaybe<Scalars['String']>;
  question_not_contains?: InputMaybe<Scalars['String']>;
  question_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface FaqItemLinkingCollections {
  __typename?: 'FaqItemLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  faqGroupCollection?: Maybe<FaqGroupCollection>;
}

export interface FaqItemLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface FaqItemLinkingCollectionsFaqGroupCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum FaqItemOrder {
  QuestionAsc = 'question_ASC',
  QuestionDesc = 'question_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePost extends Entry {
  __typename?: 'FeaturePost';
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionUrl?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  heavyPicture?: Maybe<Asset>;
  linkedFrom?: Maybe<FeaturePostLinkingCollections>;
  picture?: Maybe<Asset>;
  showHeavyPictureOnHover?: Maybe<Scalars['Boolean']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostCallToActionButtonLabelArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostCallToActionUrlArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostHeavyPictureArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostPictureArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostShowHeavyPictureOnHoverArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostVideoUrlArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface FeaturePostCollection {
  __typename?: 'FeaturePostCollection';
  items: Array<Maybe<FeaturePost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface FeaturePostFilter {
  AND?: InputMaybe<Array<InputMaybe<FeaturePostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FeaturePostFilter>>>;
  callToActionButtonLabel?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_contains?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_exists?: InputMaybe<Scalars['Boolean']>;
  callToActionButtonLabel_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  callToActionButtonLabel_not?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_not_contains?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  callToActionUrl?: InputMaybe<Scalars['String']>;
  callToActionUrl_contains?: InputMaybe<Scalars['String']>;
  callToActionUrl_exists?: InputMaybe<Scalars['Boolean']>;
  callToActionUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  callToActionUrl_not?: InputMaybe<Scalars['String']>;
  callToActionUrl_not_contains?: InputMaybe<Scalars['String']>;
  callToActionUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  heavyPicture_exists?: InputMaybe<Scalars['Boolean']>;
  picture_exists?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover_exists?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  videoUrl?: InputMaybe<Scalars['String']>;
  videoUrl_contains?: InputMaybe<Scalars['String']>;
  videoUrl_exists?: InputMaybe<Scalars['Boolean']>;
  videoUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  videoUrl_not?: InputMaybe<Scalars['String']>;
  videoUrl_not_contains?: InputMaybe<Scalars['String']>;
  videoUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface FeaturePostLinkingCollections {
  __typename?: 'FeaturePostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionFeaturePostsCollection?: Maybe<PageSectionFeaturePostsCollection>;
}

export interface FeaturePostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface FeaturePostLinkingCollectionsPageSectionFeaturePostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum FeaturePostOrder {
  CallToActionButtonLabelAsc = 'callToActionButtonLabel_ASC',
  CallToActionButtonLabelDesc = 'callToActionButtonLabel_DESC',
  CallToActionUrlAsc = 'callToActionUrl_ASC',
  CallToActionUrlDesc = 'callToActionUrl_DESC',
  ShowHeavyPictureOnHoverAsc = 'showHeavyPictureOnHover_ASC',
  ShowHeavyPictureOnHoverDesc = 'showHeavyPictureOnHover_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  VideoUrlAsc = 'videoUrl_ASC',
  VideoUrlDesc = 'videoUrl_DESC',
}

/** Main website footer component. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/footer) */
export interface Footer extends Entry {
  __typename?: 'Footer';
  contentfulMetadata: ContentfulMetadata;
  copyright?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<FooterLinkingCollections>;
  linksCollection?: Maybe<FooterLinksCollection>;
  socialIconsCollection?: Maybe<FooterSocialIconsCollection>;
  sys: Sys;
}

/** Main website footer component. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/footer) */
export interface FooterCopyrightArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Main website footer component. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/footer) */
export interface FooterLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Main website footer component. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/footer) */
export interface FooterLinksCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Main website footer component. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/footer) */
export interface FooterSocialIconsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface FooterCollection {
  __typename?: 'FooterCollection';
  items: Array<Maybe<Footer>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface FooterFilter {
  AND?: InputMaybe<Array<InputMaybe<FooterFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FooterFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  copyright?: InputMaybe<Scalars['String']>;
  copyright_contains?: InputMaybe<Scalars['String']>;
  copyright_exists?: InputMaybe<Scalars['Boolean']>;
  copyright_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  copyright_not?: InputMaybe<Scalars['String']>;
  copyright_not_contains?: InputMaybe<Scalars['String']>;
  copyright_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  linksCollection_exists?: InputMaybe<Scalars['Boolean']>;
  socialIconsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
}

export interface FooterLinkingCollections {
  __typename?: 'FooterLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface FooterLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface FooterLinksCollection {
  __typename?: 'FooterLinksCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export enum FooterOrder {
  CopyrightAsc = 'copyright_ASC',
  CopyrightDesc = 'copyright_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface FooterSocialIconsCollection {
  __typename?: 'FooterSocialIconsCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPost extends Entry {
  __typename?: 'GrandPost';
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionUrl?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  heavyPicture?: Maybe<Asset>;
  linkedFrom?: Maybe<GrandPostLinkingCollections>;
  picture?: Maybe<Asset>;
  showHeavyPictureOnHover?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostCallToActionButtonLabelArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostCallToActionUrlArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostHeavyPictureArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostPictureArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostShowHeavyPictureOnHoverArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post with the biggest surface area on the screen. Best displayed in pairs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/grandPost) */
export interface GrandPostVideoUrlArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface GrandPostCollection {
  __typename?: 'GrandPostCollection';
  items: Array<Maybe<GrandPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface GrandPostFilter {
  AND?: InputMaybe<Array<InputMaybe<GrandPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<GrandPostFilter>>>;
  callToActionButtonLabel?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_contains?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_exists?: InputMaybe<Scalars['Boolean']>;
  callToActionButtonLabel_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  callToActionButtonLabel_not?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_not_contains?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  callToActionUrl?: InputMaybe<Scalars['String']>;
  callToActionUrl_contains?: InputMaybe<Scalars['String']>;
  callToActionUrl_exists?: InputMaybe<Scalars['Boolean']>;
  callToActionUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  callToActionUrl_not?: InputMaybe<Scalars['String']>;
  callToActionUrl_not_contains?: InputMaybe<Scalars['String']>;
  callToActionUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  heavyPicture_exists?: InputMaybe<Scalars['Boolean']>;
  picture_exists?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover_exists?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  videoUrl?: InputMaybe<Scalars['String']>;
  videoUrl_contains?: InputMaybe<Scalars['String']>;
  videoUrl_exists?: InputMaybe<Scalars['Boolean']>;
  videoUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  videoUrl_not?: InputMaybe<Scalars['String']>;
  videoUrl_not_contains?: InputMaybe<Scalars['String']>;
  videoUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface GrandPostLinkingCollections {
  __typename?: 'GrandPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionGrandPostsCollection?: Maybe<PageSectionGrandPostsCollection>;
}

export interface GrandPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface GrandPostLinkingCollectionsPageSectionGrandPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum GrandPostOrder {
  CallToActionButtonLabelAsc = 'callToActionButtonLabel_ASC',
  CallToActionButtonLabelDesc = 'callToActionButtonLabel_DESC',
  CallToActionUrlAsc = 'callToActionUrl_ASC',
  CallToActionUrlDesc = 'callToActionUrl_DESC',
  ShowHeavyPictureOnHoverAsc = 'showHeavyPictureOnHover_ASC',
  ShowHeavyPictureOnHoverDesc = 'showHeavyPictureOnHover_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  VideoUrlAsc = 'videoUrl_ASC',
  VideoUrlDesc = 'videoUrl_DESC',
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTile extends Entry {
  __typename?: 'IconTile';
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionUrl?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<IconTileLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileCallToActionButtonLabelArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileCallToActionUrlArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileIconArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface IconTileCollection {
  __typename?: 'IconTileCollection';
  items: Array<Maybe<IconTile>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface IconTileFilter {
  AND?: InputMaybe<Array<InputMaybe<IconTileFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IconTileFilter>>>;
  callToActionButtonLabel?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_contains?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_exists?: InputMaybe<Scalars['Boolean']>;
  callToActionButtonLabel_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  callToActionButtonLabel_not?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_not_contains?: InputMaybe<Scalars['String']>;
  callToActionButtonLabel_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  callToActionUrl?: InputMaybe<Scalars['String']>;
  callToActionUrl_contains?: InputMaybe<Scalars['String']>;
  callToActionUrl_exists?: InputMaybe<Scalars['Boolean']>;
  callToActionUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  callToActionUrl_not?: InputMaybe<Scalars['String']>;
  callToActionUrl_not_contains?: InputMaybe<Scalars['String']>;
  callToActionUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon?: InputMaybe<Scalars['String']>;
  icon_contains?: InputMaybe<Scalars['String']>;
  icon_exists?: InputMaybe<Scalars['Boolean']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_not?: InputMaybe<Scalars['String']>;
  icon_not_contains?: InputMaybe<Scalars['String']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface IconTileLinkingCollections {
  __typename?: 'IconTileLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionIconTilesCollection?: Maybe<PageSectionIconTilesCollection>;
}

export interface IconTileLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface IconTileLinkingCollectionsPageSectionIconTilesCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum IconTileOrder {
  CallToActionButtonLabelAsc = 'callToActionButtonLabel_ASC',
  CallToActionButtonLabelDesc = 'callToActionButtonLabel_DESC',
  CallToActionUrlAsc = 'callToActionUrl_ASC',
  CallToActionUrlDesc = 'callToActionUrl_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IconAsc = 'icon_ASC',
  IconDesc = 'icon_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP',
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB',
}

export interface ImageTransformOptions {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']>;
}

/** Legal post model for Privacy, Terms of Use, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/legalPost) */
export interface LegalPost extends Entry {
  __typename?: 'LegalPost';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<LegalPostDescription>;
  linkedFrom?: Maybe<LegalPostLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Legal post model for Privacy, Terms of Use, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/legalPost) */
export interface LegalPostDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Legal post model for Privacy, Terms of Use, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/legalPost) */
export interface LegalPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Legal post model for Privacy, Terms of Use, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/legalPost) */
export interface LegalPostSlugArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Legal post model for Privacy, Terms of Use, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/legalPost) */
export interface LegalPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface LegalPostCollection {
  __typename?: 'LegalPostCollection';
  items: Array<Maybe<LegalPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface LegalPostDescription {
  __typename?: 'LegalPostDescription';
  json: Scalars['JSON'];
  links: LegalPostDescriptionLinks;
}

export interface LegalPostDescriptionAssets {
  __typename?: 'LegalPostDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
}

export interface LegalPostDescriptionEntries {
  __typename?: 'LegalPostDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
}

export interface LegalPostDescriptionLinks {
  __typename?: 'LegalPostDescriptionLinks';
  assets: LegalPostDescriptionAssets;
  entries: LegalPostDescriptionEntries;
}

export interface LegalPostFilter {
  AND?: InputMaybe<Array<InputMaybe<LegalPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LegalPostFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface LegalPostLinkingCollections {
  __typename?: 'LegalPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface LegalPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum LegalPostOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWall extends Entry {
  __typename?: 'PageAccessWall';
  contentfulMetadata: ContentfulMetadata;
  ctasCollection?: Maybe<PageAccessWallCtasCollection>;
  headerAlignCenter?: Maybe<Scalars['Boolean']>;
  headerColumnWidth?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageAccessWallLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageAccessWallSectionsCollection>;
  showSubtitle?: Maybe<Scalars['Boolean']>;
  showTitle?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallCtasCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallHeaderAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallHeaderColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallMainTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallSectionsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallShowSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Access Wall page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageAccessWall) */
export interface PageAccessWallSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageAccessWallCollection {
  __typename?: 'PageAccessWallCollection';
  items: Array<Maybe<PageAccessWall>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageAccessWallCtasCollection {
  __typename?: 'PageAccessWallCtasCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageAccessWallFilter {
  AND?: InputMaybe<Array<InputMaybe<PageAccessWallFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageAccessWallFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ctasCollection_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_not?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth?: InputMaybe<Scalars['String']>;
  headerColumnWidth_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headerColumnWidth_not?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle?: InputMaybe<Scalars['String']>;
  mainTitle_contains?: InputMaybe<Scalars['String']>;
  mainTitle_exists?: InputMaybe<Scalars['Boolean']>;
  mainTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle_not?: InputMaybe<Scalars['String']>;
  mainTitle_not_contains?: InputMaybe<Scalars['String']>;
  mainTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sectionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_not?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface PageAccessWallLinkingCollections {
  __typename?: 'PageAccessWallLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageAccessWallLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageAccessWallOrder {
  HeaderAlignCenterAsc = 'headerAlignCenter_ASC',
  HeaderAlignCenterDesc = 'headerAlignCenter_DESC',
  HeaderColumnWidthAsc = 'headerColumnWidth_ASC',
  HeaderColumnWidthDesc = 'headerColumnWidth_DESC',
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
  ShowSubtitleAsc = 'showSubtitle_ASC',
  ShowSubtitleDesc = 'showSubtitle_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface PageAccessWallSectionsCollection {
  __typename?: 'PageAccessWallSectionsCollection';
  items: Array<Maybe<PageAccessWallSectionsItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export type PageAccessWallSectionsItem =
  | PageSectionBasicPosts
  | PageSectionFaQs
  | PageSectionFeaturePosts
  | PageSectionGrandPosts
  | PageSectionIconTiles
  | PageSectionSectionPosts
  | PageSectionThumbnailPosts;

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarn extends Entry {
  __typename?: 'PageEarn';
  contentfulMetadata: ContentfulMetadata;
  ctasCollection?: Maybe<PageEarnCtasCollection>;
  headerAlignCenter?: Maybe<Scalars['Boolean']>;
  headerColumnWidth?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageEarnLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageEarnSectionsCollection>;
  showSubtitle?: Maybe<Scalars['Boolean']>;
  showTitle?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnCtasCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnHeaderAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnHeaderColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnMainTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnSectionsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnShowSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Earn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageEarn) */
export interface PageEarnSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageEarnCollection {
  __typename?: 'PageEarnCollection';
  items: Array<Maybe<PageEarn>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageEarnCtasCollection {
  __typename?: 'PageEarnCtasCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageEarnFilter {
  AND?: InputMaybe<Array<InputMaybe<PageEarnFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageEarnFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ctasCollection_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_not?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth?: InputMaybe<Scalars['String']>;
  headerColumnWidth_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headerColumnWidth_not?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle?: InputMaybe<Scalars['String']>;
  mainTitle_contains?: InputMaybe<Scalars['String']>;
  mainTitle_exists?: InputMaybe<Scalars['Boolean']>;
  mainTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle_not?: InputMaybe<Scalars['String']>;
  mainTitle_not_contains?: InputMaybe<Scalars['String']>;
  mainTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sectionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_not?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface PageEarnLinkingCollections {
  __typename?: 'PageEarnLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageEarnLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageEarnOrder {
  HeaderAlignCenterAsc = 'headerAlignCenter_ASC',
  HeaderAlignCenterDesc = 'headerAlignCenter_DESC',
  HeaderColumnWidthAsc = 'headerColumnWidth_ASC',
  HeaderColumnWidthDesc = 'headerColumnWidth_DESC',
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
  ShowSubtitleAsc = 'showSubtitle_ASC',
  ShowSubtitleDesc = 'showSubtitle_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface PageEarnSectionsCollection {
  __typename?: 'PageEarnSectionsCollection';
  items: Array<Maybe<PageEarnSectionsItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export type PageEarnSectionsItem =
  | PageSectionBasicPosts
  | PageSectionDappPosts
  | PageSectionFaQs
  | PageSectionFeaturePosts
  | PageSectionGrandPosts
  | PageSectionIconTiles
  | PageSectionSectionPosts
  | PageSectionThumbnailPosts;

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGame extends Entry {
  __typename?: 'PageGame';
  contentfulMetadata: ContentfulMetadata;
  ctasCollection?: Maybe<PageGameCtasCollection>;
  headerAlignCenter?: Maybe<Scalars['Boolean']>;
  headerColumnWidth?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageGameLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageGameSectionsCollection>;
  showSubtitle?: Maybe<Scalars['Boolean']>;
  showTitle?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameCtasCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameHeaderAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameHeaderColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameMainTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameSectionsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameShowSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Game page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageGame) */
export interface PageGameSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageGameCollection {
  __typename?: 'PageGameCollection';
  items: Array<Maybe<PageGame>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageGameCtasCollection {
  __typename?: 'PageGameCtasCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageGameFilter {
  AND?: InputMaybe<Array<InputMaybe<PageGameFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageGameFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ctasCollection_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_not?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth?: InputMaybe<Scalars['String']>;
  headerColumnWidth_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headerColumnWidth_not?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle?: InputMaybe<Scalars['String']>;
  mainTitle_contains?: InputMaybe<Scalars['String']>;
  mainTitle_exists?: InputMaybe<Scalars['Boolean']>;
  mainTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle_not?: InputMaybe<Scalars['String']>;
  mainTitle_not_contains?: InputMaybe<Scalars['String']>;
  mainTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sectionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_not?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface PageGameLinkingCollections {
  __typename?: 'PageGameLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageGameLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageGameOrder {
  HeaderAlignCenterAsc = 'headerAlignCenter_ASC',
  HeaderAlignCenterDesc = 'headerAlignCenter_DESC',
  HeaderColumnWidthAsc = 'headerColumnWidth_ASC',
  HeaderColumnWidthDesc = 'headerColumnWidth_DESC',
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
  ShowSubtitleAsc = 'showSubtitle_ASC',
  ShowSubtitleDesc = 'showSubtitle_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface PageGameSectionsCollection {
  __typename?: 'PageGameSectionsCollection';
  items: Array<Maybe<PageGameSectionsItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export type PageGameSectionsItem =
  | PageSectionBasicPosts
  | PageSectionDappPosts
  | PageSectionFaQs
  | PageSectionFeaturePosts
  | PageSectionGrandPosts
  | PageSectionIconTiles
  | PageSectionSectionPosts
  | PageSectionThumbnailPosts;

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHome extends Entry {
  __typename?: 'PageHome';
  contentfulMetadata: ContentfulMetadata;
  ctasCollection?: Maybe<PageHomeCtasCollection>;
  headerAlignCenter?: Maybe<Scalars['Boolean']>;
  headerColumnWidth?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageHomeLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageHomeSectionsCollection>;
  showSubtitle?: Maybe<Scalars['Boolean']>;
  showTitle?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeCtasCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeHeaderAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeHeaderColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeMainTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeSectionsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeShowSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageHomeCollection {
  __typename?: 'PageHomeCollection';
  items: Array<Maybe<PageHome>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageHomeCtasCollection {
  __typename?: 'PageHomeCtasCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageHomeFilter {
  AND?: InputMaybe<Array<InputMaybe<PageHomeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageHomeFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ctasCollection_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_not?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth?: InputMaybe<Scalars['String']>;
  headerColumnWidth_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headerColumnWidth_not?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle?: InputMaybe<Scalars['String']>;
  mainTitle_contains?: InputMaybe<Scalars['String']>;
  mainTitle_exists?: InputMaybe<Scalars['Boolean']>;
  mainTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle_not?: InputMaybe<Scalars['String']>;
  mainTitle_not_contains?: InputMaybe<Scalars['String']>;
  mainTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sectionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_not?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface PageHomeLinkingCollections {
  __typename?: 'PageHomeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageHomeLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageHomeOrder {
  HeaderAlignCenterAsc = 'headerAlignCenter_ASC',
  HeaderAlignCenterDesc = 'headerAlignCenter_DESC',
  HeaderColumnWidthAsc = 'headerColumnWidth_ASC',
  HeaderColumnWidthDesc = 'headerColumnWidth_DESC',
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
  ShowSubtitleAsc = 'showSubtitle_ASC',
  ShowSubtitleDesc = 'showSubtitle_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface PageHomeSectionsCollection {
  __typename?: 'PageHomeSectionsCollection';
  items: Array<Maybe<PageHomeSectionsItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export type PageHomeSectionsItem =
  | PageSectionBasicPosts
  | PageSectionDappPosts
  | PageSectionFaQs
  | PageSectionFeaturePosts
  | PageSectionGrandPosts
  | PageSectionIconTiles
  | PageSectionPersonPosts
  | PageSectionSectionPosts
  | PageSectionThumbnailPosts;

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearn extends Entry {
  __typename?: 'PageLearn';
  contentfulMetadata: ContentfulMetadata;
  ctasCollection?: Maybe<PageLearnCtasCollection>;
  headerAlignCenter?: Maybe<Scalars['Boolean']>;
  headerColumnWidth?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageLearnLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageLearnSectionsCollection>;
  showSubtitle?: Maybe<Scalars['Boolean']>;
  showTitle?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnCtasCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnHeaderAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnHeaderColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnMainTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnSectionsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnShowSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageLearnCollection {
  __typename?: 'PageLearnCollection';
  items: Array<Maybe<PageLearn>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageLearnCtasCollection {
  __typename?: 'PageLearnCtasCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageLearnFilter {
  AND?: InputMaybe<Array<InputMaybe<PageLearnFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageLearnFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ctasCollection_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_not?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth?: InputMaybe<Scalars['String']>;
  headerColumnWidth_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headerColumnWidth_not?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle?: InputMaybe<Scalars['String']>;
  mainTitle_contains?: InputMaybe<Scalars['String']>;
  mainTitle_exists?: InputMaybe<Scalars['Boolean']>;
  mainTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle_not?: InputMaybe<Scalars['String']>;
  mainTitle_not_contains?: InputMaybe<Scalars['String']>;
  mainTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sectionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_not?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface PageLearnLinkingCollections {
  __typename?: 'PageLearnLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageLearnLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageLearnOrder {
  HeaderAlignCenterAsc = 'headerAlignCenter_ASC',
  HeaderAlignCenterDesc = 'headerAlignCenter_DESC',
  HeaderColumnWidthAsc = 'headerColumnWidth_ASC',
  HeaderColumnWidthDesc = 'headerColumnWidth_DESC',
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
  ShowSubtitleAsc = 'showSubtitle_ASC',
  ShowSubtitleDesc = 'showSubtitle_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface PageLearnSectionsCollection {
  __typename?: 'PageLearnSectionsCollection';
  items: Array<Maybe<PageLearnSectionsItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export type PageLearnSectionsItem =
  | PageSectionBasicPosts
  | PageSectionDappPosts
  | PageSectionFaQs
  | PageSectionFeaturePosts
  | PageSectionGrandPosts
  | PageSectionIconTiles
  | PageSectionPersonPosts
  | PageSectionSectionPosts
  | PageSectionThumbnailPosts;

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPosts extends Entry {
  __typename?: 'PageSectionBasicPosts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedPostsCollection?: Maybe<PageSectionBasicPostsHandpickedPostsCollection>;
  linkedFrom?: Maybe<PageSectionBasicPostsLinkingCollections>;
  postsByCategory?: Maybe<BasicPostCategory>;
  swiperResponsiveOptions?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsHandpickedPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsPostsByCategoryArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsSwiperResponsiveOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionBasicPostsCollection {
  __typename?: 'PageSectionBasicPostsCollection';
  items: Array<Maybe<PageSectionBasicPosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionBasicPostsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionBasicPostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionBasicPostsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  postsByCategory?: InputMaybe<CfBasicPostCategoryNestedFilter>;
  postsByCategory_exists?: InputMaybe<Scalars['Boolean']>;
  swiperResponsiveOptions_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionBasicPostsHandpickedPostsCollection {
  __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
  items: Array<Maybe<BasicPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionBasicPostsLinkingCollections {
  __typename?: 'PageSectionBasicPostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionBasicPostsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionBasicPostsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with D`App Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionDappPosts) */
export interface PageSectionDappPosts extends Entry {
  __typename?: 'PageSectionDappPosts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedPostsCollection?: Maybe<PageSectionDappPostsHandpickedPostsCollection>;
  linkedFrom?: Maybe<PageSectionDappPostsLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with D`App Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionDappPosts) */
export interface PageSectionDappPostsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with D`App Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionDappPosts) */
export interface PageSectionDappPostsHandpickedPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with D`App Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionDappPosts) */
export interface PageSectionDappPostsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with D`App Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionDappPosts) */
export interface PageSectionDappPostsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionDappPostsCollection {
  __typename?: 'PageSectionDappPostsCollection';
  items: Array<Maybe<PageSectionDappPosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionDappPostsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionDappPostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionDappPostsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionDappPostsHandpickedPostsCollection {
  __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
  items: Array<Maybe<DappPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionDappPostsLinkingCollections {
  __typename?: 'PageSectionDappPostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionDappPostsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionDappPostsLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionDappPostsLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionDappPostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionDappPostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionDappPostsLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionDappPostsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQs extends Entry {
  __typename?: 'PageSectionFaQs';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedFaqGroupsCollection?: Maybe<PageSectionFaQsHandpickedFaqGroupsCollection>;
  linkedFrom?: Maybe<PageSectionFaQsLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQsHandpickedFaqGroupsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionFaQsCollection {
  __typename?: 'PageSectionFaQsCollection';
  items: Array<Maybe<PageSectionFaQs>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionFaQsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionFaQsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionFaQsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedFAQGroupsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionFaQsHandpickedFaqGroupsCollection {
  __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
  items: Array<Maybe<FaqGroup>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionFaQsLinkingCollections {
  __typename?: 'PageSectionFaQsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionFaQsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionFaQsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePosts extends Entry {
  __typename?: 'PageSectionFeaturePosts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedPostsCollection?: Maybe<PageSectionFeaturePostsHandpickedPostsCollection>;
  linkedFrom?: Maybe<PageSectionFeaturePostsLinkingCollections>;
  swiperResponsiveOptions?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsHandpickedPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsSwiperResponsiveOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionFeaturePostsCollection {
  __typename?: 'PageSectionFeaturePostsCollection';
  items: Array<Maybe<PageSectionFeaturePosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionFeaturePostsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionFeaturePostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionFeaturePostsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  swiperResponsiveOptions_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionFeaturePostsHandpickedPostsCollection {
  __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
  items: Array<Maybe<FeaturePost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionFeaturePostsLinkingCollections {
  __typename?: 'PageSectionFeaturePostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionFeaturePostsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFeaturePostsLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFeaturePostsLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFeaturePostsLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFeaturePostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFeaturePostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFeaturePostsLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionFeaturePostsLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionFeaturePostsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with Grand Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionGrandPosts) */
export interface PageSectionGrandPosts extends Entry {
  __typename?: 'PageSectionGrandPosts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedPostsCollection?: Maybe<PageSectionGrandPostsHandpickedPostsCollection>;
  isSwiper?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<PageSectionGrandPostsLinkingCollections>;
  swiperResponsiveOptions?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Grand Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionGrandPosts) */
export interface PageSectionGrandPostsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Grand Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionGrandPosts) */
export interface PageSectionGrandPostsHandpickedPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Grand Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionGrandPosts) */
export interface PageSectionGrandPostsIsSwiperArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Grand Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionGrandPosts) */
export interface PageSectionGrandPostsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Grand Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionGrandPosts) */
export interface PageSectionGrandPostsSwiperResponsiveOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Grand Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionGrandPosts) */
export interface PageSectionGrandPostsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionGrandPostsCollection {
  __typename?: 'PageSectionGrandPostsCollection';
  items: Array<Maybe<PageSectionGrandPosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionGrandPostsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionGrandPostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionGrandPostsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  isSwiper?: InputMaybe<Scalars['Boolean']>;
  isSwiper_exists?: InputMaybe<Scalars['Boolean']>;
  isSwiper_not?: InputMaybe<Scalars['Boolean']>;
  swiperResponsiveOptions_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionGrandPostsHandpickedPostsCollection {
  __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
  items: Array<Maybe<GrandPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionGrandPostsLinkingCollections {
  __typename?: 'PageSectionGrandPostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionGrandPostsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionGrandPostsLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionGrandPostsLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionGrandPostsLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionGrandPostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionGrandPostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionGrandPostsLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionGrandPostsLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionGrandPostsOrder {
  IsSwiperAsc = 'isSwiper_ASC',
  IsSwiperDesc = 'isSwiper_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTiles extends Entry {
  __typename?: 'PageSectionIconTiles';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedIconTilesCollection?: Maybe<PageSectionIconTilesHandpickedIconTilesCollection>;
  isSwiper?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<PageSectionIconTilesLinkingCollections>;
  swiperResponsiveOptions?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesHandpickedIconTilesCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesIsSwiperArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesSwiperResponsiveOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionIconTilesCollection {
  __typename?: 'PageSectionIconTilesCollection';
  items: Array<Maybe<PageSectionIconTiles>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionIconTilesFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionIconTilesFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionIconTilesFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedIconTilesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  isSwiper?: InputMaybe<Scalars['Boolean']>;
  isSwiper_exists?: InputMaybe<Scalars['Boolean']>;
  isSwiper_not?: InputMaybe<Scalars['Boolean']>;
  swiperResponsiveOptions_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionIconTilesHandpickedIconTilesCollection {
  __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
  items: Array<Maybe<IconTile>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionIconTilesLinkingCollections {
  __typename?: 'PageSectionIconTilesLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionIconTilesLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionIconTilesOrder {
  IsSwiperAsc = 'isSwiper_ASC',
  IsSwiperDesc = 'isSwiper_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with Persons. Displays a limited amount of handpicked person posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionPersonPosts) */
export interface PageSectionPersonPosts extends Entry {
  __typename?: 'PageSectionPersonPosts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedPostsCollection?: Maybe<PageSectionPersonPostsHandpickedPostsCollection>;
  isSwiper?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<PageSectionPersonPostsLinkingCollections>;
  swiperResponsiveOptions?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Persons. Displays a limited amount of handpicked person posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionPersonPosts) */
export interface PageSectionPersonPostsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Persons. Displays a limited amount of handpicked person posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionPersonPosts) */
export interface PageSectionPersonPostsHandpickedPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Persons. Displays a limited amount of handpicked person posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionPersonPosts) */
export interface PageSectionPersonPostsIsSwiperArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Persons. Displays a limited amount of handpicked person posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionPersonPosts) */
export interface PageSectionPersonPostsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Persons. Displays a limited amount of handpicked person posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionPersonPosts) */
export interface PageSectionPersonPostsSwiperResponsiveOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Persons. Displays a limited amount of handpicked person posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionPersonPosts) */
export interface PageSectionPersonPostsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionPersonPostsCollection {
  __typename?: 'PageSectionPersonPostsCollection';
  items: Array<Maybe<PageSectionPersonPosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionPersonPostsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionPersonPostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionPersonPostsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  isSwiper?: InputMaybe<Scalars['Boolean']>;
  isSwiper_exists?: InputMaybe<Scalars['Boolean']>;
  isSwiper_not?: InputMaybe<Scalars['Boolean']>;
  swiperResponsiveOptions_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionPersonPostsHandpickedPostsCollection {
  __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
  items: Array<Maybe<PersonPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionPersonPostsLinkingCollections {
  __typename?: 'PageSectionPersonPostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
}

export interface PageSectionPersonPostsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionPersonPostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionPersonPostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionPersonPostsLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionPersonPostsOrder {
  IsSwiperAsc = 'isSwiper_ASC',
  IsSwiperDesc = 'isSwiper_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with Products. Can display handpicked products together with the products from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionProducts) */
export interface PageSectionProducts extends Entry {
  __typename?: 'PageSectionProducts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedProductsCollection?: Maybe<PageSectionProductsHandpickedProductsCollection>;
  linkedFrom?: Maybe<PageSectionProductsLinkingCollections>;
  productsByCategory?: Maybe<ProductCategory>;
  swiperResponsiveOptions?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Products. Can display handpicked products together with the products from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionProducts) */
export interface PageSectionProductsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Products. Can display handpicked products together with the products from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionProducts) */
export interface PageSectionProductsHandpickedProductsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Products. Can display handpicked products together with the products from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionProducts) */
export interface PageSectionProductsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Products. Can display handpicked products together with the products from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionProducts) */
export interface PageSectionProductsProductsByCategoryArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** Page section with Products. Can display handpicked products together with the products from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionProducts) */
export interface PageSectionProductsSwiperResponsiveOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Products. Can display handpicked products together with the products from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionProducts) */
export interface PageSectionProductsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionProductsCollection {
  __typename?: 'PageSectionProductsCollection';
  items: Array<Maybe<PageSectionProducts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionProductsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionProductsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionProductsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedProductsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  productsByCategory?: InputMaybe<CfProductCategoryNestedFilter>;
  productsByCategory_exists?: InputMaybe<Scalars['Boolean']>;
  swiperResponsiveOptions_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionProductsHandpickedProductsCollection {
  __typename?: 'PageSectionProductsHandpickedProductsCollection';
  items: Array<Maybe<Product>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionProductsLinkingCollections {
  __typename?: 'PageSectionProductsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
}

export interface PageSectionProductsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionProductsLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionProductsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with Section Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionSectionPosts) */
export interface PageSectionSectionPosts extends Entry {
  __typename?: 'PageSectionSectionPosts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedPostsCollection?: Maybe<PageSectionSectionPostsHandpickedPostsCollection>;
  linkedFrom?: Maybe<PageSectionSectionPostsLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Section Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionSectionPosts) */
export interface PageSectionSectionPostsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Section Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionSectionPosts) */
export interface PageSectionSectionPostsHandpickedPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Section Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionSectionPosts) */
export interface PageSectionSectionPostsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Section Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionSectionPosts) */
export interface PageSectionSectionPostsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionSectionPostsCollection {
  __typename?: 'PageSectionSectionPostsCollection';
  items: Array<Maybe<PageSectionSectionPosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionSectionPostsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionSectionPostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionSectionPostsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionSectionPostsHandpickedPostsCollection {
  __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
  items: Array<Maybe<SectionPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionSectionPostsLinkingCollections {
  __typename?: 'PageSectionSectionPostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionSectionPostsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionSectionPostsLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionSectionPostsLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionSectionPostsLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionSectionPostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionSectionPostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionSectionPostsLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionSectionPostsLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionSectionPostsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Page section with Thumbnail Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionThumbnailPosts) */
export interface PageSectionThumbnailPosts extends Entry {
  __typename?: 'PageSectionThumbnailPosts';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  handpickedPostsCollection?: Maybe<PageSectionThumbnailPostsHandpickedPostsCollection>;
  linkedFrom?: Maybe<PageSectionThumbnailPostsLinkingCollections>;
  swiperResponsiveOptions?: Maybe<Scalars['JSON']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Thumbnail Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionThumbnailPosts) */
export interface PageSectionThumbnailPostsDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Thumbnail Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionThumbnailPosts) */
export interface PageSectionThumbnailPostsHandpickedPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Page section with Thumbnail Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionThumbnailPosts) */
export interface PageSectionThumbnailPostsLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Page section with Thumbnail Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionThumbnailPosts) */
export interface PageSectionThumbnailPostsSwiperResponsiveOptionsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Page section with Thumbnail Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionThumbnailPosts) */
export interface PageSectionThumbnailPostsTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageSectionThumbnailPostsCollection {
  __typename?: 'PageSectionThumbnailPostsCollection';
  items: Array<Maybe<PageSectionThumbnailPosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionThumbnailPostsFilter {
  AND?: InputMaybe<Array<InputMaybe<PageSectionThumbnailPostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageSectionThumbnailPostsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  handpickedPostsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  swiperResponsiveOptions_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PageSectionThumbnailPostsHandpickedPostsCollection {
  __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
  items: Array<Maybe<ThumbnailPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionThumbnailPostsLinkingCollections {
  __typename?: 'PageSectionThumbnailPostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PageSectionThumbnailPostsLinkingCollectionsPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageSectionThumbnailPostsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShop extends Entry {
  __typename?: 'PageShop';
  contentfulMetadata: ContentfulMetadata;
  ctasCollection?: Maybe<PageShopCtasCollection>;
  headerAlignCenter?: Maybe<Scalars['Boolean']>;
  headerColumnWidth?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageShopLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageShopSectionsCollection>;
  showSubtitle?: Maybe<Scalars['Boolean']>;
  showTitle?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopCtasCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopHeaderAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopHeaderColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopMainTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopSectionsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopShowSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Shop page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageShop) */
export interface PageShopSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageShopCollection {
  __typename?: 'PageShopCollection';
  items: Array<Maybe<PageShop>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageShopCtasCollection {
  __typename?: 'PageShopCtasCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageShopFilter {
  AND?: InputMaybe<Array<InputMaybe<PageShopFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageShopFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ctasCollection_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_not?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth?: InputMaybe<Scalars['String']>;
  headerColumnWidth_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headerColumnWidth_not?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle?: InputMaybe<Scalars['String']>;
  mainTitle_contains?: InputMaybe<Scalars['String']>;
  mainTitle_exists?: InputMaybe<Scalars['Boolean']>;
  mainTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle_not?: InputMaybe<Scalars['String']>;
  mainTitle_not_contains?: InputMaybe<Scalars['String']>;
  mainTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sectionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_not?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface PageShopLinkingCollections {
  __typename?: 'PageShopLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageShopLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageShopOrder {
  HeaderAlignCenterAsc = 'headerAlignCenter_ASC',
  HeaderAlignCenterDesc = 'headerAlignCenter_DESC',
  HeaderColumnWidthAsc = 'headerColumnWidth_ASC',
  HeaderColumnWidthDesc = 'headerColumnWidth_DESC',
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
  ShowSubtitleAsc = 'showSubtitle_ASC',
  ShowSubtitleDesc = 'showSubtitle_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface PageShopSectionsCollection {
  __typename?: 'PageShopSectionsCollection';
  items: Array<Maybe<PageShopSectionsItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export type PageShopSectionsItem =
  | PageSectionBasicPosts
  | PageSectionFeaturePosts
  | PageSectionGrandPosts
  | PageSectionIconTiles
  | PageSectionPersonPosts
  | PageSectionProducts
  | PageSectionSectionPosts
  | PageSectionThumbnailPosts;

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStream extends Entry {
  __typename?: 'PageStream';
  contentfulMetadata: ContentfulMetadata;
  ctasCollection?: Maybe<PageStreamCtasCollection>;
  headerAlignCenter?: Maybe<Scalars['Boolean']>;
  headerColumnWidth?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PageStreamLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageStreamSectionsCollection>;
  showSubtitle?: Maybe<Scalars['Boolean']>;
  showTitle?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamCtasCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamHeaderAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamHeaderColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamMainTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamSectionsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamShowSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Stream page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageStream) */
export interface PageStreamSubtitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PageStreamCollection {
  __typename?: 'PageStreamCollection';
  items: Array<Maybe<PageStream>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageStreamCtasCollection {
  __typename?: 'PageStreamCtasCollection';
  items: Array<Maybe<CallToAction>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageStreamFilter {
  AND?: InputMaybe<Array<InputMaybe<PageStreamFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageStreamFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ctasCollection_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  headerAlignCenter_not?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth?: InputMaybe<Scalars['String']>;
  headerColumnWidth_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  headerColumnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headerColumnWidth_not?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_contains?: InputMaybe<Scalars['String']>;
  headerColumnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle?: InputMaybe<Scalars['String']>;
  mainTitle_contains?: InputMaybe<Scalars['String']>;
  mainTitle_exists?: InputMaybe<Scalars['Boolean']>;
  mainTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mainTitle_not?: InputMaybe<Scalars['String']>;
  mainTitle_not_contains?: InputMaybe<Scalars['String']>;
  mainTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sectionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_exists?: InputMaybe<Scalars['Boolean']>;
  showSubtitle_not?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  subtitle_contains?: InputMaybe<Scalars['String']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subtitle_not?: InputMaybe<Scalars['String']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface PageStreamLinkingCollections {
  __typename?: 'PageStreamLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageStreamLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PageStreamOrder {
  HeaderAlignCenterAsc = 'headerAlignCenter_ASC',
  HeaderAlignCenterDesc = 'headerAlignCenter_DESC',
  HeaderColumnWidthAsc = 'headerColumnWidth_ASC',
  HeaderColumnWidthDesc = 'headerColumnWidth_DESC',
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
  ShowSubtitleAsc = 'showSubtitle_ASC',
  ShowSubtitleDesc = 'showSubtitle_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface PageStreamSectionsCollection {
  __typename?: 'PageStreamSectionsCollection';
  items: Array<Maybe<PageStreamSectionsItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export type PageStreamSectionsItem =
  | PageSectionBasicPosts
  | PageSectionDappPosts
  | PageSectionFaQs
  | PageSectionFeaturePosts
  | PageSectionGrandPosts
  | PageSectionIconTiles
  | PageSectionSectionPosts
  | PageSectionThumbnailPosts;

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPost extends Entry {
  __typename?: 'PersonPost';
  avatar?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<PersonPostLinkingCollections>;
  linkedin?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostAvatarArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostGithubArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostInstagramArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostLinkedinArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostNameArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A post representing a person with avatar and social media links [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/personPost) */
export interface PersonPostTwitterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface PersonPostCollection {
  __typename?: 'PersonPostCollection';
  items: Array<Maybe<PersonPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PersonPostFilter {
  AND?: InputMaybe<Array<InputMaybe<PersonPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PersonPostFilter>>>;
  avatar_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  github?: InputMaybe<Scalars['String']>;
  github_contains?: InputMaybe<Scalars['String']>;
  github_exists?: InputMaybe<Scalars['Boolean']>;
  github_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  github_not?: InputMaybe<Scalars['String']>;
  github_not_contains?: InputMaybe<Scalars['String']>;
  github_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  instagram?: InputMaybe<Scalars['String']>;
  instagram_contains?: InputMaybe<Scalars['String']>;
  instagram_exists?: InputMaybe<Scalars['Boolean']>;
  instagram_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  instagram_not?: InputMaybe<Scalars['String']>;
  instagram_not_contains?: InputMaybe<Scalars['String']>;
  instagram_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  linkedin?: InputMaybe<Scalars['String']>;
  linkedin_contains?: InputMaybe<Scalars['String']>;
  linkedin_exists?: InputMaybe<Scalars['Boolean']>;
  linkedin_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  linkedin_not?: InputMaybe<Scalars['String']>;
  linkedin_not_contains?: InputMaybe<Scalars['String']>;
  linkedin_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  twitter?: InputMaybe<Scalars['String']>;
  twitter_contains?: InputMaybe<Scalars['String']>;
  twitter_exists?: InputMaybe<Scalars['Boolean']>;
  twitter_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  twitter_not?: InputMaybe<Scalars['String']>;
  twitter_not_contains?: InputMaybe<Scalars['String']>;
  twitter_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface PersonPostLinkingCollections {
  __typename?: 'PersonPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionPersonPostsCollection?: Maybe<PageSectionPersonPostsCollection>;
}

export interface PersonPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface PersonPostLinkingCollectionsPageSectionPersonPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum PersonPostOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  GithubAsc = 'github_ASC',
  GithubDesc = 'github_DESC',
  InstagramAsc = 'instagram_ASC',
  InstagramDesc = 'instagram_DESC',
  LinkedinAsc = 'linkedin_ASC',
  LinkedinDesc = 'linkedin_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TwitterAsc = 'twitter_ASC',
  TwitterDesc = 'twitter_DESC',
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface Product extends Entry {
  __typename?: 'Product';
  availableColors?: Maybe<Array<Maybe<Scalars['String']>>>;
  availableQuantity?: Maybe<Scalars['Int']>;
  availableSizes?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<ProductCategory>;
  contentfulMetadata: ContentfulMetadata;
  currency?: Maybe<Scalars['String']>;
  fullDescription?: Maybe<ProductFullDescription>;
  linkedFrom?: Maybe<ProductLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  picturesCollection?: Maybe<AssetCollection>;
  price?: Maybe<Scalars['Float']>;
  shortDescription?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductAvailableColorsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductAvailableQuantityArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductAvailableSizesArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductCategoryArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductCurrencyArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductFullDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductNameArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductPicturesCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductPriceArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductShortDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductSkuArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Online shop product item. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/product) */
export interface ProductSlugArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/productCategory) */
export interface ProductCategory extends Entry {
  __typename?: 'ProductCategory';
  contentfulMetadata: ContentfulMetadata;
  icon?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ProductCategoryLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/productCategory) */
export interface ProductCategoryIconArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/productCategory) */
export interface ProductCategoryLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/productCategory) */
export interface ProductCategoryNameArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface ProductCategoryCollection {
  __typename?: 'ProductCategoryCollection';
  items: Array<Maybe<ProductCategory>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface ProductCategoryFilter {
  AND?: InputMaybe<Array<InputMaybe<ProductCategoryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProductCategoryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon?: InputMaybe<Scalars['String']>;
  icon_contains?: InputMaybe<Scalars['String']>;
  icon_exists?: InputMaybe<Scalars['Boolean']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_not?: InputMaybe<Scalars['String']>;
  icon_not_contains?: InputMaybe<Scalars['String']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface ProductCategoryLinkingCollections {
  __typename?: 'ProductCategoryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionProductsCollection?: Maybe<PageSectionProductsCollection>;
  productCollection?: Maybe<ProductCollection>;
}

export interface ProductCategoryLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface ProductCategoryLinkingCollectionsPageSectionProductsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface ProductCategoryLinkingCollectionsProductCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum ProductCategoryOrder {
  IconAsc = 'icon_ASC',
  IconDesc = 'icon_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface ProductCollection {
  __typename?: 'ProductCollection';
  items: Array<Maybe<Product>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface ProductFilter {
  AND?: InputMaybe<Array<InputMaybe<ProductFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProductFilter>>>;
  availableColors_contains_all?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  availableColors_contains_none?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  availableColors_contains_some?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  availableColors_exists?: InputMaybe<Scalars['Boolean']>;
  availableQuantity?: InputMaybe<Scalars['Int']>;
  availableQuantity_exists?: InputMaybe<Scalars['Boolean']>;
  availableQuantity_gt?: InputMaybe<Scalars['Int']>;
  availableQuantity_gte?: InputMaybe<Scalars['Int']>;
  availableQuantity_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  availableQuantity_lt?: InputMaybe<Scalars['Int']>;
  availableQuantity_lte?: InputMaybe<Scalars['Int']>;
  availableQuantity_not?: InputMaybe<Scalars['Int']>;
  availableQuantity_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  availableSizes_contains_all?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  availableSizes_contains_none?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  availableSizes_contains_some?: InputMaybe<
    Array<InputMaybe<Scalars['String']>>
  >;
  availableSizes_exists?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<CfProductCategoryNestedFilter>;
  category_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  currency?: InputMaybe<Scalars['String']>;
  currency_contains?: InputMaybe<Scalars['String']>;
  currency_exists?: InputMaybe<Scalars['Boolean']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  currency_not?: InputMaybe<Scalars['String']>;
  currency_not_contains?: InputMaybe<Scalars['String']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fullDescription_contains?: InputMaybe<Scalars['String']>;
  fullDescription_exists?: InputMaybe<Scalars['Boolean']>;
  fullDescription_not_contains?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  picturesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Float']>;
  price_exists?: InputMaybe<Scalars['Boolean']>;
  price_gt?: InputMaybe<Scalars['Float']>;
  price_gte?: InputMaybe<Scalars['Float']>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  price_lt?: InputMaybe<Scalars['Float']>;
  price_lte?: InputMaybe<Scalars['Float']>;
  price_not?: InputMaybe<Scalars['Float']>;
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  shortDescription?: InputMaybe<Scalars['String']>;
  shortDescription_contains?: InputMaybe<Scalars['String']>;
  shortDescription_exists?: InputMaybe<Scalars['Boolean']>;
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shortDescription_not?: InputMaybe<Scalars['String']>;
  shortDescription_not_contains?: InputMaybe<Scalars['String']>;
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sku?: InputMaybe<Scalars['String']>;
  sku_contains?: InputMaybe<Scalars['String']>;
  sku_exists?: InputMaybe<Scalars['Boolean']>;
  sku_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sku_not?: InputMaybe<Scalars['String']>;
  sku_not_contains?: InputMaybe<Scalars['String']>;
  sku_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface ProductFullDescription {
  __typename?: 'ProductFullDescription';
  json: Scalars['JSON'];
  links: ProductFullDescriptionLinks;
}

export interface ProductFullDescriptionAssets {
  __typename?: 'ProductFullDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
}

export interface ProductFullDescriptionEntries {
  __typename?: 'ProductFullDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
}

export interface ProductFullDescriptionLinks {
  __typename?: 'ProductFullDescriptionLinks';
  assets: ProductFullDescriptionAssets;
  entries: ProductFullDescriptionEntries;
}

export interface ProductLinkingCollections {
  __typename?: 'ProductLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionProductsCollection?: Maybe<PageSectionProductsCollection>;
}

export interface ProductLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface ProductLinkingCollectionsPageSectionProductsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum ProductOrder {
  AvailableQuantityAsc = 'availableQuantity_ASC',
  AvailableQuantityDesc = 'availableQuantity_DESC',
  CurrencyAsc = 'currency_ASC',
  CurrencyDesc = 'currency_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  SkuAsc = 'sku_ASC',
  SkuDesc = 'sku_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface Query {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  basicPost?: Maybe<BasicPost>;
  basicPostCategory?: Maybe<BasicPostCategory>;
  basicPostCategoryCollection?: Maybe<BasicPostCategoryCollection>;
  basicPostCollection?: Maybe<BasicPostCollection>;
  callToAction?: Maybe<CallToAction>;
  callToActionCollection?: Maybe<CallToActionCollection>;
  chartPost?: Maybe<ChartPost>;
  chartPostCollection?: Maybe<ChartPostCollection>;
  dappPost?: Maybe<DappPost>;
  dappPostCollection?: Maybe<DappPostCollection>;
  embedPost?: Maybe<EmbedPost>;
  embedPostCollection?: Maybe<EmbedPostCollection>;
  entryCollection?: Maybe<EntryCollection>;
  faqGroup?: Maybe<FaqGroup>;
  faqGroupCollection?: Maybe<FaqGroupCollection>;
  faqItem?: Maybe<FaqItem>;
  faqItemCollection?: Maybe<FaqItemCollection>;
  featurePost?: Maybe<FeaturePost>;
  featurePostCollection?: Maybe<FeaturePostCollection>;
  footer?: Maybe<Footer>;
  footerCollection?: Maybe<FooterCollection>;
  grandPost?: Maybe<GrandPost>;
  grandPostCollection?: Maybe<GrandPostCollection>;
  iconTile?: Maybe<IconTile>;
  iconTileCollection?: Maybe<IconTileCollection>;
  legalPost?: Maybe<LegalPost>;
  legalPostCollection?: Maybe<LegalPostCollection>;
  pageAccessWall?: Maybe<PageAccessWall>;
  pageAccessWallCollection?: Maybe<PageAccessWallCollection>;
  pageEarn?: Maybe<PageEarn>;
  pageEarnCollection?: Maybe<PageEarnCollection>;
  pageGame?: Maybe<PageGame>;
  pageGameCollection?: Maybe<PageGameCollection>;
  pageHome?: Maybe<PageHome>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearn?: Maybe<PageLearn>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageSectionBasicPosts?: Maybe<PageSectionBasicPosts>;
  pageSectionBasicPostsCollection?: Maybe<PageSectionBasicPostsCollection>;
  pageSectionDappPosts?: Maybe<PageSectionDappPosts>;
  pageSectionDappPostsCollection?: Maybe<PageSectionDappPostsCollection>;
  pageSectionFaQs?: Maybe<PageSectionFaQs>;
  pageSectionFaQsCollection?: Maybe<PageSectionFaQsCollection>;
  pageSectionFeaturePosts?: Maybe<PageSectionFeaturePosts>;
  pageSectionFeaturePostsCollection?: Maybe<PageSectionFeaturePostsCollection>;
  pageSectionGrandPosts?: Maybe<PageSectionGrandPosts>;
  pageSectionGrandPostsCollection?: Maybe<PageSectionGrandPostsCollection>;
  pageSectionIconTiles?: Maybe<PageSectionIconTiles>;
  pageSectionIconTilesCollection?: Maybe<PageSectionIconTilesCollection>;
  pageSectionPersonPosts?: Maybe<PageSectionPersonPosts>;
  pageSectionPersonPostsCollection?: Maybe<PageSectionPersonPostsCollection>;
  pageSectionProducts?: Maybe<PageSectionProducts>;
  pageSectionProductsCollection?: Maybe<PageSectionProductsCollection>;
  pageSectionSectionPosts?: Maybe<PageSectionSectionPosts>;
  pageSectionSectionPostsCollection?: Maybe<PageSectionSectionPostsCollection>;
  pageSectionThumbnailPosts?: Maybe<PageSectionThumbnailPosts>;
  pageSectionThumbnailPostsCollection?: Maybe<PageSectionThumbnailPostsCollection>;
  pageShop?: Maybe<PageShop>;
  pageShopCollection?: Maybe<PageShopCollection>;
  pageStream?: Maybe<PageStream>;
  pageStreamCollection?: Maybe<PageStreamCollection>;
  personPost?: Maybe<PersonPost>;
  personPostCollection?: Maybe<PersonPostCollection>;
  product?: Maybe<Product>;
  productCategory?: Maybe<ProductCategory>;
  productCategoryCollection?: Maybe<ProductCategoryCollection>;
  productCollection?: Maybe<ProductCollection>;
  sectionPost?: Maybe<SectionPost>;
  sectionPostCollection?: Maybe<SectionPostCollection>;
  thumbnailPost?: Maybe<ThumbnailPost>;
  thumbnailPostCollection?: Maybe<ThumbnailPostCollection>;
}

export interface QueryAssetArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryAssetCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
}

export interface QueryBasicPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryBasicPostCategoryArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryBasicPostCategoryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<BasicPostCategoryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BasicPostCategoryFilter>;
}

export interface QueryBasicPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<BasicPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BasicPostFilter>;
}

export interface QueryCallToActionArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryCallToActionCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CallToActionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CallToActionFilter>;
}

export interface QueryChartPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryChartPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ChartPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChartPostFilter>;
}

export interface QueryDappPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryDappPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<DappPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DappPostFilter>;
}

export interface QueryEmbedPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryEmbedPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EmbedPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EmbedPostFilter>;
}

export interface QueryEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
}

export interface QueryFaqGroupArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryFaqGroupCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<FaqGroupOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FaqGroupFilter>;
}

export interface QueryFaqItemArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryFaqItemCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<FaqItemOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FaqItemFilter>;
}

export interface QueryFeaturePostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryFeaturePostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<FeaturePostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturePostFilter>;
}

export interface QueryFooterArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryFooterCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<FooterOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FooterFilter>;
}

export interface QueryGrandPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryGrandPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<GrandPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GrandPostFilter>;
}

export interface QueryIconTileArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryIconTileCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<IconTileOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IconTileFilter>;
}

export interface QueryLegalPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryLegalPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<LegalPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LegalPostFilter>;
}

export interface QueryPageAccessWallArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageAccessWallCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageAccessWallOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageAccessWallFilter>;
}

export interface QueryPageEarnArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageEarnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageEarnOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageEarnFilter>;
}

export interface QueryPageGameArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageGameCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageGameOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageGameFilter>;
}

export interface QueryPageHomeArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageHomeCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageHomeOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageHomeFilter>;
}

export interface QueryPageLearnArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageLearnCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageLearnOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageLearnFilter>;
}

export interface QueryPageSectionBasicPostsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionBasicPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionBasicPostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionBasicPostsFilter>;
}

export interface QueryPageSectionDappPostsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionDappPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionDappPostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionDappPostsFilter>;
}

export interface QueryPageSectionFaQsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionFaQsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionFaQsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionFaQsFilter>;
}

export interface QueryPageSectionFeaturePostsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionFeaturePostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionFeaturePostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionFeaturePostsFilter>;
}

export interface QueryPageSectionGrandPostsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionGrandPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionGrandPostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionGrandPostsFilter>;
}

export interface QueryPageSectionIconTilesArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionIconTilesCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionIconTilesOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionIconTilesFilter>;
}

export interface QueryPageSectionPersonPostsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionPersonPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionPersonPostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionPersonPostsFilter>;
}

export interface QueryPageSectionProductsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionProductsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionProductsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionProductsFilter>;
}

export interface QueryPageSectionSectionPostsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionSectionPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionSectionPostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionSectionPostsFilter>;
}

export interface QueryPageSectionThumbnailPostsArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageSectionThumbnailPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageSectionThumbnailPostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageSectionThumbnailPostsFilter>;
}

export interface QueryPageShopArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageShopCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageShopOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageShopFilter>;
}

export interface QueryPageStreamArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPageStreamCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PageStreamOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageStreamFilter>;
}

export interface QueryPersonPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryPersonPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PersonPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonPostFilter>;
}

export interface QueryProductArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryProductCategoryArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryProductCategoryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ProductCategoryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductCategoryFilter>;
}

export interface QueryProductCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ProductOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductFilter>;
}

export interface QuerySectionPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QuerySectionPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<SectionPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SectionPostFilter>;
}

export interface QueryThumbnailPostArgs {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryThumbnailPostCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ThumbnailPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ThumbnailPostFilter>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPost extends Entry {
  __typename?: 'SectionPost';
  alignCenter?: Maybe<Scalars['Boolean']>;
  chartPost?: Maybe<ChartPost>;
  columnWidth?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<SectionPostDescription>;
  embedPost?: Maybe<EmbedPost>;
  linkedFrom?: Maybe<SectionPostLinkingCollections>;
  showTitle?: Maybe<Scalars['Boolean']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  titleSize?: Maybe<Scalars['String']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostAlignCenterArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostChartPostArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostColumnWidthArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostDescriptionArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostEmbedPostArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostShowTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** A short post rendered inside the section. Useful for inline paragraphs. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/sectionPost) */
export interface SectionPostTitleSizeArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface SectionPostCollection {
  __typename?: 'SectionPostCollection';
  items: Array<Maybe<SectionPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface SectionPostDescription {
  __typename?: 'SectionPostDescription';
  json: Scalars['JSON'];
  links: SectionPostDescriptionLinks;
}

export interface SectionPostDescriptionAssets {
  __typename?: 'SectionPostDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
}

export interface SectionPostDescriptionEntries {
  __typename?: 'SectionPostDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
}

export interface SectionPostDescriptionLinks {
  __typename?: 'SectionPostDescriptionLinks';
  assets: SectionPostDescriptionAssets;
  entries: SectionPostDescriptionEntries;
}

export interface SectionPostFilter {
  AND?: InputMaybe<Array<InputMaybe<SectionPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SectionPostFilter>>>;
  alignCenter?: InputMaybe<Scalars['Boolean']>;
  alignCenter_exists?: InputMaybe<Scalars['Boolean']>;
  alignCenter_not?: InputMaybe<Scalars['Boolean']>;
  chartPost?: InputMaybe<CfChartPostNestedFilter>;
  chartPost_exists?: InputMaybe<Scalars['Boolean']>;
  columnWidth?: InputMaybe<Scalars['String']>;
  columnWidth_contains?: InputMaybe<Scalars['String']>;
  columnWidth_exists?: InputMaybe<Scalars['Boolean']>;
  columnWidth_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  columnWidth_not?: InputMaybe<Scalars['String']>;
  columnWidth_not_contains?: InputMaybe<Scalars['String']>;
  columnWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  embedPost?: InputMaybe<CfEmbedPostNestedFilter>;
  embedPost_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  showTitle_exists?: InputMaybe<Scalars['Boolean']>;
  showTitle_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  titleSize?: InputMaybe<Scalars['String']>;
  titleSize_contains?: InputMaybe<Scalars['String']>;
  titleSize_exists?: InputMaybe<Scalars['Boolean']>;
  titleSize_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  titleSize_not?: InputMaybe<Scalars['String']>;
  titleSize_not_contains?: InputMaybe<Scalars['String']>;
  titleSize_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface SectionPostLinkingCollections {
  __typename?: 'SectionPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionSectionPostsCollection?: Maybe<PageSectionSectionPostsCollection>;
}

export interface SectionPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface SectionPostLinkingCollectionsPageSectionSectionPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum SectionPostOrder {
  AlignCenterAsc = 'alignCenter_ASC',
  AlignCenterDesc = 'alignCenter_DESC',
  ColumnWidthAsc = 'columnWidth_ASC',
  ColumnWidthDesc = 'columnWidth_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleSizeAsc = 'titleSize_ASC',
  TitleSizeDesc = 'titleSize_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export interface Sys {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
}

export interface SysFilter {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPost extends Entry {
  __typename?: 'ThumbnailPost';
  contentfulMetadata: ContentfulMetadata;
  heavyPicture?: Maybe<Asset>;
  isVideo?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ThumbnailPostLinkingCollections>;
  picture?: Maybe<Asset>;
  showHeavyPictureOnHover?: Maybe<Scalars['Boolean']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPostHeavyPictureArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPostIsVideoArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPostLinkArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPostLinkedFromArgs {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPostPictureArgs {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPostShowHeavyPictureOnHoverArgs {
  locale?: InputMaybe<Scalars['String']>;
}

/** Single thumbnail post with a link. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/thumbnailPost) */
export interface ThumbnailPostTitleArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface ThumbnailPostCollection {
  __typename?: 'ThumbnailPostCollection';
  items: Array<Maybe<ThumbnailPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface ThumbnailPostFilter {
  AND?: InputMaybe<Array<InputMaybe<ThumbnailPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ThumbnailPostFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  heavyPicture_exists?: InputMaybe<Scalars['Boolean']>;
  isVideo?: InputMaybe<Scalars['Boolean']>;
  isVideo_exists?: InputMaybe<Scalars['Boolean']>;
  isVideo_not?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  link_contains?: InputMaybe<Scalars['String']>;
  link_exists?: InputMaybe<Scalars['Boolean']>;
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  link_not?: InputMaybe<Scalars['String']>;
  link_not_contains?: InputMaybe<Scalars['String']>;
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  picture_exists?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover_exists?: InputMaybe<Scalars['Boolean']>;
  showHeavyPictureOnHover_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface ThumbnailPostLinkingCollections {
  __typename?: 'ThumbnailPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionThumbnailPostsCollection?: Maybe<PageSectionThumbnailPostsCollection>;
}

export interface ThumbnailPostLinkingCollectionsEntryCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export interface ThumbnailPostLinkingCollectionsPageSectionThumbnailPostsCollectionArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
}

export enum ThumbnailPostOrder {
  IsVideoAsc = 'isVideo_ASC',
  IsVideoDesc = 'isVideo_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  ShowHeavyPictureOnHoverAsc = 'showHeavyPictureOnHover_ASC',
  ShowHeavyPictureOnHoverDesc = 'showHeavyPictureOnHover_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export interface CfBasicPostCategoryNestedFilter {
  AND?: InputMaybe<Array<InputMaybe<CfBasicPostCategoryNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfBasicPostCategoryNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export interface CfChartPostNestedFilter {
  AND?: InputMaybe<Array<InputMaybe<CfChartPostNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfChartPostNestedFilter>>>;
  chartData_exists?: InputMaybe<Scalars['Boolean']>;
  chartOptions_exists?: InputMaybe<Scalars['Boolean']>;
  chartType?: InputMaybe<Scalars['String']>;
  chartType_contains?: InputMaybe<Scalars['String']>;
  chartType_exists?: InputMaybe<Scalars['Boolean']>;
  chartType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  chartType_not?: InputMaybe<Scalars['String']>;
  chartType_not_contains?: InputMaybe<Scalars['String']>;
  chartType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  hideTitle?: InputMaybe<Scalars['Boolean']>;
  hideTitle_exists?: InputMaybe<Scalars['Boolean']>;
  hideTitle_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface CfEmbedPostNestedFilter {
  AND?: InputMaybe<Array<InputMaybe<CfEmbedPostNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfEmbedPostNestedFilter>>>;
  aspectRatio?: InputMaybe<Scalars['String']>;
  aspectRatio_contains?: InputMaybe<Scalars['String']>;
  aspectRatio_exists?: InputMaybe<Scalars['Boolean']>;
  aspectRatio_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  aspectRatio_not?: InputMaybe<Scalars['String']>;
  aspectRatio_not_contains?: InputMaybe<Scalars['String']>;
  aspectRatio_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  embedCode?: InputMaybe<Scalars['String']>;
  embedCode_contains?: InputMaybe<Scalars['String']>;
  embedCode_exists?: InputMaybe<Scalars['Boolean']>;
  embedCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  embedCode_not?: InputMaybe<Scalars['String']>;
  embedCode_not_contains?: InputMaybe<Scalars['String']>;
  embedCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  hideTitle?: InputMaybe<Scalars['Boolean']>;
  hideTitle_exists?: InputMaybe<Scalars['Boolean']>;
  hideTitle_not?: InputMaybe<Scalars['Boolean']>;
  scriptUrl?: InputMaybe<Scalars['String']>;
  scriptUrl_contains?: InputMaybe<Scalars['String']>;
  scriptUrl_exists?: InputMaybe<Scalars['Boolean']>;
  scriptUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  scriptUrl_not?: InputMaybe<Scalars['String']>;
  scriptUrl_not_contains?: InputMaybe<Scalars['String']>;
  scriptUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

export interface CfProductCategoryNestedFilter {
  AND?: InputMaybe<Array<InputMaybe<CfProductCategoryNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfProductCategoryNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon?: InputMaybe<Scalars['String']>;
  icon_contains?: InputMaybe<Scalars['String']>;
  icon_exists?: InputMaybe<Scalars['Boolean']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_not?: InputMaybe<Scalars['String']>;
  icon_not_contains?: InputMaybe<Scalars['String']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
}

export type BasicPostCommonFragment = {
  __typename?: 'BasicPost';
  title?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  mainPicture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type BasicPostFragment = {
  __typename?: 'BasicPost';
  summary?: string | undefined;
  slug?: string | undefined;
  title?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  mainPicture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type BasicPostDetailFragment = {
  __typename?: 'BasicPost';
  title?: string | undefined;
  description?: { __typename?: 'BasicPostDescription'; json: any } | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  mainPicture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type CallToActionFragment = {
  __typename?: 'CallToAction';
  label?: string | undefined;
  externalLink?: string | undefined;
  routerLink?: any | undefined;
  type?: string | undefined;
  style?: string | undefined;
  size?: string | undefined;
  icon?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
};

export type ChartPostFragment = {
  __typename?: 'ChartPost';
  title?: string | undefined;
  hideTitle?: boolean | undefined;
  chartType?: string | undefined;
  chartData?: any | undefined;
  chartOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
};

export type SysFragment = { __typename?: 'Sys'; publishedAt?: any | undefined };

export type DappPostFragment = {
  __typename?: 'DappPost';
  icon?: string | undefined;
  iconTitle?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  urlToDapp?: string | undefined;
  urlToLearnMore?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
};

export type EmbedPostFragment = {
  __typename?: 'EmbedPost';
  title?: string | undefined;
  hideTitle?: boolean | undefined;
  embedCode?: string | undefined;
  scriptUrl?: string | undefined;
  aspectRatio?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
};

export type FaqGroupFragment = {
  __typename?: 'FaqGroup';
  name?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  faqItemCollection?:
    | {
        __typename?: 'FaqGroupFaqItemCollection';
        items: Array<
          | {
              __typename?: 'FaqItem';
              question?: string | undefined;
              answer?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
};

export type FaqItemFragment = {
  __typename?: 'FaqItem';
  question?: string | undefined;
  answer?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
};

export type FeaturePostFragment = {
  __typename?: 'FeaturePost';
  videoUrl?: string | undefined;
  showHeavyPictureOnHover?: boolean | undefined;
  title?: string | undefined;
  description?: string | undefined;
  callToActionUrl?: string | undefined;
  callToActionButtonLabel?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  picture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
  heavyPicture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type FooterFragment = {
  __typename?: 'Footer';
  copyright?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  linksCollection?:
    | {
        __typename?: 'FooterLinksCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  socialIconsCollection?:
    | {
        __typename?: 'FooterSocialIconsCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
};

export type GrandPostFragment = {
  __typename?: 'GrandPost';
  videoUrl?: string | undefined;
  showHeavyPictureOnHover?: boolean | undefined;
  title?: string | undefined;
  subtitle?: string | undefined;
  description?: string | undefined;
  callToActionUrl?: string | undefined;
  callToActionButtonLabel?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  picture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
  heavyPicture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type IconTileFragment = {
  __typename?: 'IconTile';
  icon?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  callToActionUrl?: string | undefined;
  callToActionButtonLabel?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
};

export type LegalPostFragment = {
  __typename?: 'LegalPost';
  title?: string | undefined;
  slug?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  description?: { __typename?: 'LegalPostDescription'; json: any } | undefined;
};

export type PageAccessWallFragment = {
  __typename?: 'PageAccessWall';
  mainTitle?: string | undefined;
  showTitle?: boolean | undefined;
  subtitle?: string | undefined;
  showSubtitle?: boolean | undefined;
  headerColumnWidth?: string | undefined;
  headerAlignCenter?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  ctasCollection?:
    | {
        __typename?: 'PageAccessWallCtasCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  sectionsCollection?:
    | {
        __typename?: 'PageAccessWallSectionsCollection';
        items: Array<
          | {
              __typename: 'PageSectionBasicPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              postsByCategory?:
                | {
                    __typename?: 'BasicPostCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'BasicPostCategoryLinkingCollections';
                          basicPostCollection?:
                            | {
                                __typename?: 'BasicPostCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFaQs';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedFaqGroupsCollection?:
                | {
                    __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                    items: Array<
                      | {
                          __typename?: 'FaqGroup';
                          name?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          faqItemCollection?:
                            | {
                                __typename?: 'FaqGroupFaqItemCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqItem';
                                      question?: string | undefined;
                                      answer?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFeaturePosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'FeaturePost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionGrandPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'GrandPost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          subtitle?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionIconTiles';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedIconTilesCollection?:
                | {
                    __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                    items: Array<
                      | {
                          __typename?: 'IconTile';
                          icon?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionSectionPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'SectionPost';
                          title?: string | undefined;
                          showTitle?: boolean | undefined;
                          columnWidth?: string | undefined;
                          alignCenter?: boolean | undefined;
                          titleSize?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          richDescription?:
                            | {
                                __typename?: 'SectionPostDescription';
                                json: any;
                              }
                            | undefined;
                          chartPost?:
                            | {
                                __typename?: 'ChartPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                chartType?: string | undefined;
                                chartData?: any | undefined;
                                chartOptions?: any | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          embedPost?:
                            | {
                                __typename?: 'EmbedPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                embedCode?: string | undefined;
                                scriptUrl?: string | undefined;
                                aspectRatio?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionThumbnailPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'ThumbnailPost';
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          link?: string | undefined;
                          isVideo?: boolean | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageEarnFragment = {
  __typename?: 'PageEarn';
  mainTitle?: string | undefined;
  showTitle?: boolean | undefined;
  subtitle?: string | undefined;
  showSubtitle?: boolean | undefined;
  headerColumnWidth?: string | undefined;
  headerAlignCenter?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  ctasCollection?:
    | {
        __typename?: 'PageEarnCtasCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  sectionsCollection?:
    | {
        __typename?: 'PageEarnSectionsCollection';
        items: Array<
          | {
              __typename: 'PageSectionBasicPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              postsByCategory?:
                | {
                    __typename?: 'BasicPostCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'BasicPostCategoryLinkingCollections';
                          basicPostCollection?:
                            | {
                                __typename?: 'BasicPostCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionDappPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'DappPost';
                          icon?: string | undefined;
                          iconTitle?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          urlToDapp?: string | undefined;
                          urlToLearnMore?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFaQs';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedFaqGroupsCollection?:
                | {
                    __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                    items: Array<
                      | {
                          __typename?: 'FaqGroup';
                          name?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          faqItemCollection?:
                            | {
                                __typename?: 'FaqGroupFaqItemCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqItem';
                                      question?: string | undefined;
                                      answer?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFeaturePosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'FeaturePost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionGrandPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'GrandPost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          subtitle?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionIconTiles';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedIconTilesCollection?:
                | {
                    __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                    items: Array<
                      | {
                          __typename?: 'IconTile';
                          icon?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionSectionPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'SectionPost';
                          title?: string | undefined;
                          showTitle?: boolean | undefined;
                          columnWidth?: string | undefined;
                          alignCenter?: boolean | undefined;
                          titleSize?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          richDescription?:
                            | {
                                __typename?: 'SectionPostDescription';
                                json: any;
                              }
                            | undefined;
                          chartPost?:
                            | {
                                __typename?: 'ChartPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                chartType?: string | undefined;
                                chartData?: any | undefined;
                                chartOptions?: any | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          embedPost?:
                            | {
                                __typename?: 'EmbedPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                embedCode?: string | undefined;
                                scriptUrl?: string | undefined;
                                aspectRatio?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionThumbnailPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'ThumbnailPost';
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          link?: string | undefined;
                          isVideo?: boolean | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageGameFragment = {
  __typename?: 'PageGame';
  mainTitle?: string | undefined;
  showTitle?: boolean | undefined;
  subtitle?: string | undefined;
  showSubtitle?: boolean | undefined;
  headerColumnWidth?: string | undefined;
  headerAlignCenter?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  ctasCollection?:
    | {
        __typename?: 'PageGameCtasCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  sectionsCollection?:
    | {
        __typename?: 'PageGameSectionsCollection';
        items: Array<
          | {
              __typename: 'PageSectionBasicPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              postsByCategory?:
                | {
                    __typename?: 'BasicPostCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'BasicPostCategoryLinkingCollections';
                          basicPostCollection?:
                            | {
                                __typename?: 'BasicPostCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionDappPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'DappPost';
                          icon?: string | undefined;
                          iconTitle?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          urlToDapp?: string | undefined;
                          urlToLearnMore?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFaQs';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedFaqGroupsCollection?:
                | {
                    __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                    items: Array<
                      | {
                          __typename?: 'FaqGroup';
                          name?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          faqItemCollection?:
                            | {
                                __typename?: 'FaqGroupFaqItemCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqItem';
                                      question?: string | undefined;
                                      answer?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFeaturePosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'FeaturePost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionGrandPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'GrandPost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          subtitle?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionIconTiles';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedIconTilesCollection?:
                | {
                    __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                    items: Array<
                      | {
                          __typename?: 'IconTile';
                          icon?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionSectionPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'SectionPost';
                          title?: string | undefined;
                          showTitle?: boolean | undefined;
                          columnWidth?: string | undefined;
                          alignCenter?: boolean | undefined;
                          titleSize?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          richDescription?:
                            | {
                                __typename?: 'SectionPostDescription';
                                json: any;
                              }
                            | undefined;
                          chartPost?:
                            | {
                                __typename?: 'ChartPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                chartType?: string | undefined;
                                chartData?: any | undefined;
                                chartOptions?: any | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          embedPost?:
                            | {
                                __typename?: 'EmbedPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                embedCode?: string | undefined;
                                scriptUrl?: string | undefined;
                                aspectRatio?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionThumbnailPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'ThumbnailPost';
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          link?: string | undefined;
                          isVideo?: boolean | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageHomeFragment = {
  __typename?: 'PageHome';
  mainTitle?: string | undefined;
  showTitle?: boolean | undefined;
  subtitle?: string | undefined;
  showSubtitle?: boolean | undefined;
  headerColumnWidth?: string | undefined;
  headerAlignCenter?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  ctasCollection?:
    | {
        __typename?: 'PageHomeCtasCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  sectionsCollection?:
    | {
        __typename?: 'PageHomeSectionsCollection';
        items: Array<
          | {
              __typename: 'PageSectionBasicPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              postsByCategory?:
                | {
                    __typename?: 'BasicPostCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'BasicPostCategoryLinkingCollections';
                          basicPostCollection?:
                            | {
                                __typename?: 'BasicPostCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionDappPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'DappPost';
                          icon?: string | undefined;
                          iconTitle?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          urlToDapp?: string | undefined;
                          urlToLearnMore?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFaQs';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedFaqGroupsCollection?:
                | {
                    __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                    items: Array<
                      | {
                          __typename?: 'FaqGroup';
                          name?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          faqItemCollection?:
                            | {
                                __typename?: 'FaqGroupFaqItemCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqItem';
                                      question?: string | undefined;
                                      answer?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFeaturePosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'FeaturePost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionGrandPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'GrandPost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          subtitle?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionIconTiles';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedIconTilesCollection?:
                | {
                    __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                    items: Array<
                      | {
                          __typename?: 'IconTile';
                          icon?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionPersonPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'PersonPost';
                          name?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          twitter?: string | undefined;
                          linkedin?: string | undefined;
                          instagram?: string | undefined;
                          github?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          avatar?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionSectionPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'SectionPost';
                          title?: string | undefined;
                          showTitle?: boolean | undefined;
                          columnWidth?: string | undefined;
                          alignCenter?: boolean | undefined;
                          titleSize?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          richDescription?:
                            | {
                                __typename?: 'SectionPostDescription';
                                json: any;
                              }
                            | undefined;
                          chartPost?:
                            | {
                                __typename?: 'ChartPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                chartType?: string | undefined;
                                chartData?: any | undefined;
                                chartOptions?: any | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          embedPost?:
                            | {
                                __typename?: 'EmbedPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                embedCode?: string | undefined;
                                scriptUrl?: string | undefined;
                                aspectRatio?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionThumbnailPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'ThumbnailPost';
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          link?: string | undefined;
                          isVideo?: boolean | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageLearnFragment = {
  __typename?: 'PageLearn';
  mainTitle?: string | undefined;
  showTitle?: boolean | undefined;
  subtitle?: string | undefined;
  showSubtitle?: boolean | undefined;
  headerColumnWidth?: string | undefined;
  headerAlignCenter?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  ctasCollection?:
    | {
        __typename?: 'PageLearnCtasCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  sectionsCollection?:
    | {
        __typename?: 'PageLearnSectionsCollection';
        items: Array<
          | {
              __typename: 'PageSectionBasicPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              postsByCategory?:
                | {
                    __typename?: 'BasicPostCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'BasicPostCategoryLinkingCollections';
                          basicPostCollection?:
                            | {
                                __typename?: 'BasicPostCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionDappPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'DappPost';
                          icon?: string | undefined;
                          iconTitle?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          urlToDapp?: string | undefined;
                          urlToLearnMore?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFaQs';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedFaqGroupsCollection?:
                | {
                    __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                    items: Array<
                      | {
                          __typename?: 'FaqGroup';
                          name?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          faqItemCollection?:
                            | {
                                __typename?: 'FaqGroupFaqItemCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqItem';
                                      question?: string | undefined;
                                      answer?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFeaturePosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'FeaturePost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionGrandPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'GrandPost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          subtitle?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionIconTiles';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedIconTilesCollection?:
                | {
                    __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                    items: Array<
                      | {
                          __typename?: 'IconTile';
                          icon?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionPersonPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'PersonPost';
                          name?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          twitter?: string | undefined;
                          linkedin?: string | undefined;
                          instagram?: string | undefined;
                          github?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          avatar?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionSectionPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'SectionPost';
                          title?: string | undefined;
                          showTitle?: boolean | undefined;
                          columnWidth?: string | undefined;
                          alignCenter?: boolean | undefined;
                          titleSize?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          richDescription?:
                            | {
                                __typename?: 'SectionPostDescription';
                                json: any;
                              }
                            | undefined;
                          chartPost?:
                            | {
                                __typename?: 'ChartPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                chartType?: string | undefined;
                                chartData?: any | undefined;
                                chartOptions?: any | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          embedPost?:
                            | {
                                __typename?: 'EmbedPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                embedCode?: string | undefined;
                                scriptUrl?: string | undefined;
                                aspectRatio?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionThumbnailPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'ThumbnailPost';
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          link?: string | undefined;
                          isVideo?: boolean | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionBasicPostsFragment = {
  __typename: 'PageSectionBasicPosts';
  title?: string | undefined;
  description?: string | undefined;
  swiperResponsiveOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedPostsCollection?:
    | {
        __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
        items: Array<
          | {
              __typename?: 'BasicPost';
              summary?: string | undefined;
              slug?: string | undefined;
              title?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              mainPicture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
  postsByCategory?:
    | {
        __typename?: 'BasicPostCategory';
        linkedFrom?:
          | {
              __typename?: 'BasicPostCategoryLinkingCollections';
              basicPostCollection?:
                | {
                    __typename?: 'BasicPostCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type PageSectionDappPostsFragment = {
  __typename: 'PageSectionDappPosts';
  title?: string | undefined;
  description?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedPostsCollection?:
    | {
        __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
        items: Array<
          | {
              __typename?: 'DappPost';
              icon?: string | undefined;
              iconTitle?: string | undefined;
              title?: string | undefined;
              description?: string | undefined;
              urlToDapp?: string | undefined;
              urlToLearnMore?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionFaQsFragment = {
  __typename: 'PageSectionFaQs';
  title?: string | undefined;
  description?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedFaqGroupsCollection?:
    | {
        __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
        items: Array<
          | {
              __typename?: 'FaqGroup';
              name?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              faqItemCollection?:
                | {
                    __typename?: 'FaqGroupFaqItemCollection';
                    items: Array<
                      | {
                          __typename?: 'FaqItem';
                          question?: string | undefined;
                          answer?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionFeaturePostsFragment = {
  __typename: 'PageSectionFeaturePosts';
  title?: string | undefined;
  description?: string | undefined;
  swiperResponsiveOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedPostsCollection?:
    | {
        __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
        items: Array<
          | {
              __typename?: 'FeaturePost';
              videoUrl?: string | undefined;
              showHeavyPictureOnHover?: boolean | undefined;
              title?: string | undefined;
              description?: string | undefined;
              callToActionUrl?: string | undefined;
              callToActionButtonLabel?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              picture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
              heavyPicture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionGrandPostsFragment = {
  __typename: 'PageSectionGrandPosts';
  title?: string | undefined;
  description?: string | undefined;
  isSwiper?: boolean | undefined;
  swiperResponsiveOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedPostsCollection?:
    | {
        __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
        items: Array<
          | {
              __typename?: 'GrandPost';
              videoUrl?: string | undefined;
              showHeavyPictureOnHover?: boolean | undefined;
              title?: string | undefined;
              subtitle?: string | undefined;
              description?: string | undefined;
              callToActionUrl?: string | undefined;
              callToActionButtonLabel?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              picture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
              heavyPicture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionIconTilesFragment = {
  __typename: 'PageSectionIconTiles';
  title?: string | undefined;
  description?: string | undefined;
  isSwiper?: boolean | undefined;
  swiperResponsiveOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedIconTilesCollection?:
    | {
        __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
        items: Array<
          | {
              __typename?: 'IconTile';
              icon?: string | undefined;
              title?: string | undefined;
              description?: string | undefined;
              callToActionUrl?: string | undefined;
              callToActionButtonLabel?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionPersonPostsFragment = {
  __typename: 'PageSectionPersonPosts';
  title?: string | undefined;
  description?: string | undefined;
  isSwiper?: boolean | undefined;
  swiperResponsiveOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedPostsCollection?:
    | {
        __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
        items: Array<
          | {
              __typename?: 'PersonPost';
              name?: string | undefined;
              title?: string | undefined;
              description?: string | undefined;
              twitter?: string | undefined;
              linkedin?: string | undefined;
              instagram?: string | undefined;
              github?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              avatar?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionProductsFragment = {
  __typename: 'PageSectionProducts';
  title?: string | undefined;
  description?: string | undefined;
  swiperResponsiveOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedProductsCollection?:
    | {
        __typename?: 'PageSectionProductsHandpickedProductsCollection';
        items: Array<
          | {
              __typename?: 'Product';
              shortDescription?: string | undefined;
              name?: string | undefined;
              price?: number | undefined;
              currency?: string | undefined;
              sku?: string | undefined;
              availableQuantity?: number | undefined;
              slug?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              picturesCollection?:
                | {
                    __typename?: 'AssetCollection';
                    items: Array<
                      | {
                          __typename?: 'Asset';
                          title?: string | undefined;
                          url?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              category?:
                | {
                    __typename?: 'ProductCategory';
                    name?: string | undefined;
                    icon?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
  productsByCategory?:
    | {
        __typename?: 'ProductCategory';
        linkedFrom?:
          | {
              __typename?: 'ProductCategoryLinkingCollections';
              productCollection?:
                | {
                    __typename?: 'ProductCollection';
                    items: Array<
                      | {
                          __typename?: 'Product';
                          shortDescription?: string | undefined;
                          name?: string | undefined;
                          price?: number | undefined;
                          currency?: string | undefined;
                          sku?: string | undefined;
                          availableQuantity?: number | undefined;
                          slug?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picturesCollection?:
                            | {
                                __typename?: 'AssetCollection';
                                items: Array<
                                  | {
                                      __typename?: 'Asset';
                                      title?: string | undefined;
                                      url?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          category?:
                            | {
                                __typename?: 'ProductCategory';
                                name?: string | undefined;
                                icon?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type PageSectionSectionPostsFragment = {
  __typename: 'PageSectionSectionPosts';
  title?: string | undefined;
  description?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedPostsCollection?:
    | {
        __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
        items: Array<
          | {
              __typename?: 'SectionPost';
              title?: string | undefined;
              showTitle?: boolean | undefined;
              columnWidth?: string | undefined;
              alignCenter?: boolean | undefined;
              titleSize?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              richDescription?:
                | { __typename?: 'SectionPostDescription'; json: any }
                | undefined;
              chartPost?:
                | {
                    __typename?: 'ChartPost';
                    title?: string | undefined;
                    hideTitle?: boolean | undefined;
                    chartType?: string | undefined;
                    chartData?: any | undefined;
                    chartOptions?: any | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
              embedPost?:
                | {
                    __typename?: 'EmbedPost';
                    title?: string | undefined;
                    hideTitle?: boolean | undefined;
                    embedCode?: string | undefined;
                    scriptUrl?: string | undefined;
                    aspectRatio?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageSectionThumbnailPostsFragment = {
  __typename: 'PageSectionThumbnailPosts';
  title?: string | undefined;
  description?: string | undefined;
  swiperResponsiveOptions?: any | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  handpickedPostsCollection?:
    | {
        __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
        items: Array<
          | {
              __typename?: 'ThumbnailPost';
              showHeavyPictureOnHover?: boolean | undefined;
              title?: string | undefined;
              link?: string | undefined;
              isVideo?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              picture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
              heavyPicture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageShopFragment = {
  __typename?: 'PageShop';
  mainTitle?: string | undefined;
  showTitle?: boolean | undefined;
  subtitle?: string | undefined;
  showSubtitle?: boolean | undefined;
  headerColumnWidth?: string | undefined;
  headerAlignCenter?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  ctasCollection?:
    | {
        __typename?: 'PageShopCtasCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  sectionsCollection?:
    | {
        __typename?: 'PageShopSectionsCollection';
        items: Array<
          | {
              __typename: 'PageSectionBasicPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              postsByCategory?:
                | {
                    __typename?: 'BasicPostCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'BasicPostCategoryLinkingCollections';
                          basicPostCollection?:
                            | {
                                __typename?: 'BasicPostCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFeaturePosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'FeaturePost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionGrandPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'GrandPost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          subtitle?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionIconTiles';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedIconTilesCollection?:
                | {
                    __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                    items: Array<
                      | {
                          __typename?: 'IconTile';
                          icon?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionPersonPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'PersonPost';
                          name?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          twitter?: string | undefined;
                          linkedin?: string | undefined;
                          instagram?: string | undefined;
                          github?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          avatar?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionProducts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedProductsCollection?:
                | {
                    __typename?: 'PageSectionProductsHandpickedProductsCollection';
                    items: Array<
                      | {
                          __typename?: 'Product';
                          shortDescription?: string | undefined;
                          name?: string | undefined;
                          price?: number | undefined;
                          currency?: string | undefined;
                          sku?: string | undefined;
                          availableQuantity?: number | undefined;
                          slug?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picturesCollection?:
                            | {
                                __typename?: 'AssetCollection';
                                items: Array<
                                  | {
                                      __typename?: 'Asset';
                                      title?: string | undefined;
                                      url?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          category?:
                            | {
                                __typename?: 'ProductCategory';
                                name?: string | undefined;
                                icon?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              productsByCategory?:
                | {
                    __typename?: 'ProductCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'ProductCategoryLinkingCollections';
                          productCollection?:
                            | {
                                __typename?: 'ProductCollection';
                                items: Array<
                                  | {
                                      __typename?: 'Product';
                                      shortDescription?: string | undefined;
                                      name?: string | undefined;
                                      price?: number | undefined;
                                      currency?: string | undefined;
                                      sku?: string | undefined;
                                      availableQuantity?: number | undefined;
                                      slug?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picturesCollection?:
                                        | {
                                            __typename?: 'AssetCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'Asset';
                                                  title?: string | undefined;
                                                  url?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                      category?:
                                        | {
                                            __typename?: 'ProductCategory';
                                            name?: string | undefined;
                                            icon?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionSectionPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'SectionPost';
                          title?: string | undefined;
                          showTitle?: boolean | undefined;
                          columnWidth?: string | undefined;
                          alignCenter?: boolean | undefined;
                          titleSize?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          richDescription?:
                            | {
                                __typename?: 'SectionPostDescription';
                                json: any;
                              }
                            | undefined;
                          chartPost?:
                            | {
                                __typename?: 'ChartPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                chartType?: string | undefined;
                                chartData?: any | undefined;
                                chartOptions?: any | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          embedPost?:
                            | {
                                __typename?: 'EmbedPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                embedCode?: string | undefined;
                                scriptUrl?: string | undefined;
                                aspectRatio?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionThumbnailPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'ThumbnailPost';
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          link?: string | undefined;
                          isVideo?: boolean | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageStreamFragment = {
  __typename?: 'PageStream';
  mainTitle?: string | undefined;
  showTitle?: boolean | undefined;
  subtitle?: string | undefined;
  showSubtitle?: boolean | undefined;
  headerColumnWidth?: string | undefined;
  headerAlignCenter?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  ctasCollection?:
    | {
        __typename?: 'PageStreamCtasCollection';
        items: Array<
          | {
              __typename?: 'CallToAction';
              label?: string | undefined;
              externalLink?: string | undefined;
              routerLink?: any | undefined;
              type?: string | undefined;
              style?: string | undefined;
              size?: string | undefined;
              icon?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  sectionsCollection?:
    | {
        __typename?: 'PageStreamSectionsCollection';
        items: Array<
          | {
              __typename: 'PageSectionBasicPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'BasicPost';
                          summary?: string | undefined;
                          slug?: string | undefined;
                          title?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          mainPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
              postsByCategory?:
                | {
                    __typename?: 'BasicPostCategory';
                    linkedFrom?:
                      | {
                          __typename?: 'BasicPostCategoryLinkingCollections';
                          basicPostCollection?:
                            | {
                                __typename?: 'BasicPostCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionDappPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'DappPost';
                          icon?: string | undefined;
                          iconTitle?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          urlToDapp?: string | undefined;
                          urlToLearnMore?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFaQs';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedFaqGroupsCollection?:
                | {
                    __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                    items: Array<
                      | {
                          __typename?: 'FaqGroup';
                          name?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          faqItemCollection?:
                            | {
                                __typename?: 'FaqGroupFaqItemCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqItem';
                                      question?: string | undefined;
                                      answer?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionFeaturePosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'FeaturePost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionGrandPosts';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'GrandPost';
                          videoUrl?: string | undefined;
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          subtitle?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionIconTiles';
              title?: string | undefined;
              description?: string | undefined;
              isSwiper?: boolean | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedIconTilesCollection?:
                | {
                    __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                    items: Array<
                      | {
                          __typename?: 'IconTile';
                          icon?: string | undefined;
                          title?: string | undefined;
                          description?: string | undefined;
                          callToActionUrl?: string | undefined;
                          callToActionButtonLabel?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionSectionPosts';
              title?: string | undefined;
              description?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'SectionPost';
                          title?: string | undefined;
                          showTitle?: boolean | undefined;
                          columnWidth?: string | undefined;
                          alignCenter?: boolean | undefined;
                          titleSize?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          richDescription?:
                            | {
                                __typename?: 'SectionPostDescription';
                                json: any;
                              }
                            | undefined;
                          chartPost?:
                            | {
                                __typename?: 'ChartPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                chartType?: string | undefined;
                                chartData?: any | undefined;
                                chartOptions?: any | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          embedPost?:
                            | {
                                __typename?: 'EmbedPost';
                                title?: string | undefined;
                                hideTitle?: boolean | undefined;
                                embedCode?: string | undefined;
                                scriptUrl?: string | undefined;
                                aspectRatio?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | {
              __typename: 'PageSectionThumbnailPosts';
              title?: string | undefined;
              description?: string | undefined;
              swiperResponsiveOptions?: any | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              handpickedPostsCollection?:
                | {
                    __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                    items: Array<
                      | {
                          __typename?: 'ThumbnailPost';
                          showHeavyPictureOnHover?: boolean | undefined;
                          title?: string | undefined;
                          link?: string | undefined;
                          isVideo?: boolean | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          picture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                          heavyPicture?:
                            | {
                                __typename?: 'Asset';
                                title?: string | undefined;
                                url?: string | undefined;
                                sys: {
                                  __typename?: 'Sys';
                                  publishedAt?: any | undefined;
                                };
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PersonPostFragment = {
  __typename?: 'PersonPost';
  name?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  twitter?: string | undefined;
  linkedin?: string | undefined;
  instagram?: string | undefined;
  github?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  avatar?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type ProductCommonFragment = {
  __typename?: 'Product';
  name?: string | undefined;
  price?: number | undefined;
  currency?: string | undefined;
  sku?: string | undefined;
  availableQuantity?: number | undefined;
  slug?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  picturesCollection?:
    | {
        __typename?: 'AssetCollection';
        items: Array<
          | {
              __typename?: 'Asset';
              title?: string | undefined;
              url?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  category?:
    | {
        __typename?: 'ProductCategory';
        name?: string | undefined;
        icon?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type ProductFragment = {
  __typename?: 'Product';
  shortDescription?: string | undefined;
  name?: string | undefined;
  price?: number | undefined;
  currency?: string | undefined;
  sku?: string | undefined;
  availableQuantity?: number | undefined;
  slug?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  picturesCollection?:
    | {
        __typename?: 'AssetCollection';
        items: Array<
          | {
              __typename?: 'Asset';
              title?: string | undefined;
              url?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  category?:
    | {
        __typename?: 'ProductCategory';
        name?: string | undefined;
        icon?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type ProductDetailFragment = {
  __typename?: 'Product';
  availableColors?: Array<string | undefined> | undefined;
  availableSizes?: Array<string | undefined> | undefined;
  name?: string | undefined;
  price?: number | undefined;
  currency?: string | undefined;
  sku?: string | undefined;
  availableQuantity?: number | undefined;
  slug?: string | undefined;
  fullDescription?:
    | { __typename?: 'ProductFullDescription'; json: any }
    | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  picturesCollection?:
    | {
        __typename?: 'AssetCollection';
        items: Array<
          | {
              __typename?: 'Asset';
              title?: string | undefined;
              url?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
            }
          | undefined
        >;
      }
    | undefined;
  category?:
    | {
        __typename?: 'ProductCategory';
        name?: string | undefined;
        icon?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type SectionPostFragment = {
  __typename?: 'SectionPost';
  title?: string | undefined;
  showTitle?: boolean | undefined;
  columnWidth?: string | undefined;
  alignCenter?: boolean | undefined;
  titleSize?: string | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  richDescription?:
    | { __typename?: 'SectionPostDescription'; json: any }
    | undefined;
  chartPost?:
    | {
        __typename?: 'ChartPost';
        title?: string | undefined;
        hideTitle?: boolean | undefined;
        chartType?: string | undefined;
        chartData?: any | undefined;
        chartOptions?: any | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
  embedPost?:
    | {
        __typename?: 'EmbedPost';
        title?: string | undefined;
        hideTitle?: boolean | undefined;
        embedCode?: string | undefined;
        scriptUrl?: string | undefined;
        aspectRatio?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type ThumbnailPostFragment = {
  __typename?: 'ThumbnailPost';
  showHeavyPictureOnHover?: boolean | undefined;
  title?: string | undefined;
  link?: string | undefined;
  isVideo?: boolean | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
  picture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
  heavyPicture?:
    | {
        __typename?: 'Asset';
        title?: string | undefined;
        url?: string | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
      }
    | undefined;
};

export type BasicPostCollectionBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type BasicPostCollectionBySlugQuery = {
  __typename?: 'Query';
  basicPostCollection?:
    | {
        __typename?: 'BasicPostCollection';
        items: Array<
          | {
              __typename?: 'BasicPost';
              title?: string | undefined;
              description?:
                | { __typename?: 'BasicPostDescription'; json: any }
                | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              mainPicture?:
                | {
                    __typename?: 'Asset';
                    title?: string | undefined;
                    url?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type FooterCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type FooterCollectionQuery = {
  __typename?: 'Query';
  footerCollection?:
    | {
        __typename?: 'FooterCollection';
        items: Array<
          | {
              __typename?: 'Footer';
              copyright?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              linksCollection?:
                | {
                    __typename?: 'FooterLinksCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              socialIconsCollection?:
                | {
                    __typename?: 'FooterSocialIconsCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type LegalPostCollectionBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type LegalPostCollectionBySlugQuery = {
  __typename?: 'Query';
  legalPostCollection?:
    | {
        __typename?: 'LegalPostCollection';
        items: Array<
          | {
              __typename?: 'LegalPost';
              title?: string | undefined;
              slug?: string | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              description?:
                | { __typename?: 'LegalPostDescription'; json: any }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageAccessWallCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type PageAccessWallCollectionQuery = {
  __typename?: 'Query';
  pageAccessWallCollection?:
    | {
        __typename?: 'PageAccessWallCollection';
        items: Array<
          | {
              __typename?: 'PageAccessWall';
              mainTitle?: string | undefined;
              showTitle?: boolean | undefined;
              subtitle?: string | undefined;
              showSubtitle?: boolean | undefined;
              headerColumnWidth?: string | undefined;
              headerAlignCenter?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              ctasCollection?:
                | {
                    __typename?: 'PageAccessWallCtasCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              sectionsCollection?:
                | {
                    __typename?: 'PageAccessWallSectionsCollection';
                    items: Array<
                      | {
                          __typename: 'PageSectionBasicPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          postsByCategory?:
                            | {
                                __typename?: 'BasicPostCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'BasicPostCategoryLinkingCollections';
                                      basicPostCollection?:
                                        | {
                                            __typename?: 'BasicPostCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'BasicPost';
                                                  summary?: string | undefined;
                                                  slug?: string | undefined;
                                                  title?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  mainPicture?:
                                                    | {
                                                        __typename?: 'Asset';
                                                        title?:
                                                          | string
                                                          | undefined;
                                                        url?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFaQs';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedFaqGroupsCollection?:
                            | {
                                __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqGroup';
                                      name?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      faqItemCollection?:
                                        | {
                                            __typename?: 'FaqGroupFaqItemCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'FaqItem';
                                                  question?: string | undefined;
                                                  answer?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFeaturePosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FeaturePost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionGrandPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'GrandPost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      subtitle?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionIconTiles';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedIconTilesCollection?:
                            | {
                                __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                                items: Array<
                                  | {
                                      __typename?: 'IconTile';
                                      icon?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionSectionPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'SectionPost';
                                      title?: string | undefined;
                                      showTitle?: boolean | undefined;
                                      columnWidth?: string | undefined;
                                      alignCenter?: boolean | undefined;
                                      titleSize?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      richDescription?:
                                        | {
                                            __typename?: 'SectionPostDescription';
                                            json: any;
                                          }
                                        | undefined;
                                      chartPost?:
                                        | {
                                            __typename?: 'ChartPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            chartType?: string | undefined;
                                            chartData?: any | undefined;
                                            chartOptions?: any | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      embedPost?:
                                        | {
                                            __typename?: 'EmbedPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            embedCode?: string | undefined;
                                            scriptUrl?: string | undefined;
                                            aspectRatio?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionThumbnailPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'ThumbnailPost';
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      link?: string | undefined;
                                      isVideo?: boolean | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageEarnCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type PageEarnCollectionQuery = {
  __typename?: 'Query';
  pageEarnCollection?:
    | {
        __typename?: 'PageEarnCollection';
        items: Array<
          | {
              __typename?: 'PageEarn';
              mainTitle?: string | undefined;
              showTitle?: boolean | undefined;
              subtitle?: string | undefined;
              showSubtitle?: boolean | undefined;
              headerColumnWidth?: string | undefined;
              headerAlignCenter?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              ctasCollection?:
                | {
                    __typename?: 'PageEarnCtasCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              sectionsCollection?:
                | {
                    __typename?: 'PageEarnSectionsCollection';
                    items: Array<
                      | {
                          __typename: 'PageSectionBasicPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          postsByCategory?:
                            | {
                                __typename?: 'BasicPostCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'BasicPostCategoryLinkingCollections';
                                      basicPostCollection?:
                                        | {
                                            __typename?: 'BasicPostCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'BasicPost';
                                                  summary?: string | undefined;
                                                  slug?: string | undefined;
                                                  title?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  mainPicture?:
                                                    | {
                                                        __typename?: 'Asset';
                                                        title?:
                                                          | string
                                                          | undefined;
                                                        url?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionDappPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'DappPost';
                                      icon?: string | undefined;
                                      iconTitle?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      urlToDapp?: string | undefined;
                                      urlToLearnMore?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFaQs';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedFaqGroupsCollection?:
                            | {
                                __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqGroup';
                                      name?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      faqItemCollection?:
                                        | {
                                            __typename?: 'FaqGroupFaqItemCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'FaqItem';
                                                  question?: string | undefined;
                                                  answer?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFeaturePosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FeaturePost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionGrandPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'GrandPost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      subtitle?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionIconTiles';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedIconTilesCollection?:
                            | {
                                __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                                items: Array<
                                  | {
                                      __typename?: 'IconTile';
                                      icon?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionSectionPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'SectionPost';
                                      title?: string | undefined;
                                      showTitle?: boolean | undefined;
                                      columnWidth?: string | undefined;
                                      alignCenter?: boolean | undefined;
                                      titleSize?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      richDescription?:
                                        | {
                                            __typename?: 'SectionPostDescription';
                                            json: any;
                                          }
                                        | undefined;
                                      chartPost?:
                                        | {
                                            __typename?: 'ChartPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            chartType?: string | undefined;
                                            chartData?: any | undefined;
                                            chartOptions?: any | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      embedPost?:
                                        | {
                                            __typename?: 'EmbedPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            embedCode?: string | undefined;
                                            scriptUrl?: string | undefined;
                                            aspectRatio?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionThumbnailPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'ThumbnailPost';
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      link?: string | undefined;
                                      isVideo?: boolean | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageGameCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type PageGameCollectionQuery = {
  __typename?: 'Query';
  pageGameCollection?:
    | {
        __typename?: 'PageGameCollection';
        items: Array<
          | {
              __typename?: 'PageGame';
              mainTitle?: string | undefined;
              showTitle?: boolean | undefined;
              subtitle?: string | undefined;
              showSubtitle?: boolean | undefined;
              headerColumnWidth?: string | undefined;
              headerAlignCenter?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              ctasCollection?:
                | {
                    __typename?: 'PageGameCtasCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              sectionsCollection?:
                | {
                    __typename?: 'PageGameSectionsCollection';
                    items: Array<
                      | {
                          __typename: 'PageSectionBasicPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          postsByCategory?:
                            | {
                                __typename?: 'BasicPostCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'BasicPostCategoryLinkingCollections';
                                      basicPostCollection?:
                                        | {
                                            __typename?: 'BasicPostCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'BasicPost';
                                                  summary?: string | undefined;
                                                  slug?: string | undefined;
                                                  title?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  mainPicture?:
                                                    | {
                                                        __typename?: 'Asset';
                                                        title?:
                                                          | string
                                                          | undefined;
                                                        url?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionDappPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'DappPost';
                                      icon?: string | undefined;
                                      iconTitle?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      urlToDapp?: string | undefined;
                                      urlToLearnMore?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFaQs';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedFaqGroupsCollection?:
                            | {
                                __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqGroup';
                                      name?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      faqItemCollection?:
                                        | {
                                            __typename?: 'FaqGroupFaqItemCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'FaqItem';
                                                  question?: string | undefined;
                                                  answer?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFeaturePosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FeaturePost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionGrandPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'GrandPost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      subtitle?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionIconTiles';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedIconTilesCollection?:
                            | {
                                __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                                items: Array<
                                  | {
                                      __typename?: 'IconTile';
                                      icon?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionSectionPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'SectionPost';
                                      title?: string | undefined;
                                      showTitle?: boolean | undefined;
                                      columnWidth?: string | undefined;
                                      alignCenter?: boolean | undefined;
                                      titleSize?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      richDescription?:
                                        | {
                                            __typename?: 'SectionPostDescription';
                                            json: any;
                                          }
                                        | undefined;
                                      chartPost?:
                                        | {
                                            __typename?: 'ChartPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            chartType?: string | undefined;
                                            chartData?: any | undefined;
                                            chartOptions?: any | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      embedPost?:
                                        | {
                                            __typename?: 'EmbedPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            embedCode?: string | undefined;
                                            scriptUrl?: string | undefined;
                                            aspectRatio?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionThumbnailPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'ThumbnailPost';
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      link?: string | undefined;
                                      isVideo?: boolean | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageHomeCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type PageHomeCollectionQuery = {
  __typename?: 'Query';
  pageHomeCollection?:
    | {
        __typename?: 'PageHomeCollection';
        items: Array<
          | {
              __typename?: 'PageHome';
              mainTitle?: string | undefined;
              showTitle?: boolean | undefined;
              subtitle?: string | undefined;
              showSubtitle?: boolean | undefined;
              headerColumnWidth?: string | undefined;
              headerAlignCenter?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              ctasCollection?:
                | {
                    __typename?: 'PageHomeCtasCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              sectionsCollection?:
                | {
                    __typename?: 'PageHomeSectionsCollection';
                    items: Array<
                      | {
                          __typename: 'PageSectionBasicPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          postsByCategory?:
                            | {
                                __typename?: 'BasicPostCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'BasicPostCategoryLinkingCollections';
                                      basicPostCollection?:
                                        | {
                                            __typename?: 'BasicPostCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'BasicPost';
                                                  summary?: string | undefined;
                                                  slug?: string | undefined;
                                                  title?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  mainPicture?:
                                                    | {
                                                        __typename?: 'Asset';
                                                        title?:
                                                          | string
                                                          | undefined;
                                                        url?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionDappPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'DappPost';
                                      icon?: string | undefined;
                                      iconTitle?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      urlToDapp?: string | undefined;
                                      urlToLearnMore?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFaQs';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedFaqGroupsCollection?:
                            | {
                                __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqGroup';
                                      name?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      faqItemCollection?:
                                        | {
                                            __typename?: 'FaqGroupFaqItemCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'FaqItem';
                                                  question?: string | undefined;
                                                  answer?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFeaturePosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FeaturePost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionGrandPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'GrandPost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      subtitle?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionIconTiles';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedIconTilesCollection?:
                            | {
                                __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                                items: Array<
                                  | {
                                      __typename?: 'IconTile';
                                      icon?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionPersonPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'PersonPost';
                                      name?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      twitter?: string | undefined;
                                      linkedin?: string | undefined;
                                      instagram?: string | undefined;
                                      github?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      avatar?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionSectionPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'SectionPost';
                                      title?: string | undefined;
                                      showTitle?: boolean | undefined;
                                      columnWidth?: string | undefined;
                                      alignCenter?: boolean | undefined;
                                      titleSize?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      richDescription?:
                                        | {
                                            __typename?: 'SectionPostDescription';
                                            json: any;
                                          }
                                        | undefined;
                                      chartPost?:
                                        | {
                                            __typename?: 'ChartPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            chartType?: string | undefined;
                                            chartData?: any | undefined;
                                            chartOptions?: any | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      embedPost?:
                                        | {
                                            __typename?: 'EmbedPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            embedCode?: string | undefined;
                                            scriptUrl?: string | undefined;
                                            aspectRatio?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionThumbnailPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'ThumbnailPost';
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      link?: string | undefined;
                                      isVideo?: boolean | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageLearnCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type PageLearnCollectionQuery = {
  __typename?: 'Query';
  pageLearnCollection?:
    | {
        __typename?: 'PageLearnCollection';
        items: Array<
          | {
              __typename?: 'PageLearn';
              mainTitle?: string | undefined;
              showTitle?: boolean | undefined;
              subtitle?: string | undefined;
              showSubtitle?: boolean | undefined;
              headerColumnWidth?: string | undefined;
              headerAlignCenter?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              ctasCollection?:
                | {
                    __typename?: 'PageLearnCtasCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              sectionsCollection?:
                | {
                    __typename?: 'PageLearnSectionsCollection';
                    items: Array<
                      | {
                          __typename: 'PageSectionBasicPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          postsByCategory?:
                            | {
                                __typename?: 'BasicPostCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'BasicPostCategoryLinkingCollections';
                                      basicPostCollection?:
                                        | {
                                            __typename?: 'BasicPostCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'BasicPost';
                                                  summary?: string | undefined;
                                                  slug?: string | undefined;
                                                  title?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  mainPicture?:
                                                    | {
                                                        __typename?: 'Asset';
                                                        title?:
                                                          | string
                                                          | undefined;
                                                        url?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionDappPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'DappPost';
                                      icon?: string | undefined;
                                      iconTitle?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      urlToDapp?: string | undefined;
                                      urlToLearnMore?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFaQs';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedFaqGroupsCollection?:
                            | {
                                __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqGroup';
                                      name?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      faqItemCollection?:
                                        | {
                                            __typename?: 'FaqGroupFaqItemCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'FaqItem';
                                                  question?: string | undefined;
                                                  answer?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFeaturePosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FeaturePost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionGrandPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'GrandPost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      subtitle?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionIconTiles';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedIconTilesCollection?:
                            | {
                                __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                                items: Array<
                                  | {
                                      __typename?: 'IconTile';
                                      icon?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionPersonPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'PersonPost';
                                      name?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      twitter?: string | undefined;
                                      linkedin?: string | undefined;
                                      instagram?: string | undefined;
                                      github?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      avatar?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionSectionPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'SectionPost';
                                      title?: string | undefined;
                                      showTitle?: boolean | undefined;
                                      columnWidth?: string | undefined;
                                      alignCenter?: boolean | undefined;
                                      titleSize?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      richDescription?:
                                        | {
                                            __typename?: 'SectionPostDescription';
                                            json: any;
                                          }
                                        | undefined;
                                      chartPost?:
                                        | {
                                            __typename?: 'ChartPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            chartType?: string | undefined;
                                            chartData?: any | undefined;
                                            chartOptions?: any | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      embedPost?:
                                        | {
                                            __typename?: 'EmbedPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            embedCode?: string | undefined;
                                            scriptUrl?: string | undefined;
                                            aspectRatio?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionThumbnailPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'ThumbnailPost';
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      link?: string | undefined;
                                      isVideo?: boolean | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageShopCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type PageShopCollectionQuery = {
  __typename?: 'Query';
  pageShopCollection?:
    | {
        __typename?: 'PageShopCollection';
        items: Array<
          | {
              __typename?: 'PageShop';
              mainTitle?: string | undefined;
              showTitle?: boolean | undefined;
              subtitle?: string | undefined;
              showSubtitle?: boolean | undefined;
              headerColumnWidth?: string | undefined;
              headerAlignCenter?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              ctasCollection?:
                | {
                    __typename?: 'PageShopCtasCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              sectionsCollection?:
                | {
                    __typename?: 'PageShopSectionsCollection';
                    items: Array<
                      | {
                          __typename: 'PageSectionBasicPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          postsByCategory?:
                            | {
                                __typename?: 'BasicPostCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'BasicPostCategoryLinkingCollections';
                                      basicPostCollection?:
                                        | {
                                            __typename?: 'BasicPostCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'BasicPost';
                                                  summary?: string | undefined;
                                                  slug?: string | undefined;
                                                  title?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  mainPicture?:
                                                    | {
                                                        __typename?: 'Asset';
                                                        title?:
                                                          | string
                                                          | undefined;
                                                        url?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFeaturePosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FeaturePost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionGrandPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'GrandPost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      subtitle?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionIconTiles';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedIconTilesCollection?:
                            | {
                                __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                                items: Array<
                                  | {
                                      __typename?: 'IconTile';
                                      icon?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionPersonPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionPersonPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'PersonPost';
                                      name?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      twitter?: string | undefined;
                                      linkedin?: string | undefined;
                                      instagram?: string | undefined;
                                      github?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      avatar?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionProducts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedProductsCollection?:
                            | {
                                __typename?: 'PageSectionProductsHandpickedProductsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'Product';
                                      shortDescription?: string | undefined;
                                      name?: string | undefined;
                                      price?: number | undefined;
                                      currency?: string | undefined;
                                      sku?: string | undefined;
                                      availableQuantity?: number | undefined;
                                      slug?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picturesCollection?:
                                        | {
                                            __typename?: 'AssetCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'Asset';
                                                  title?: string | undefined;
                                                  url?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                      category?:
                                        | {
                                            __typename?: 'ProductCategory';
                                            name?: string | undefined;
                                            icon?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          productsByCategory?:
                            | {
                                __typename?: 'ProductCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'ProductCategoryLinkingCollections';
                                      productCollection?:
                                        | {
                                            __typename?: 'ProductCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'Product';
                                                  shortDescription?:
                                                    | string
                                                    | undefined;
                                                  name?: string | undefined;
                                                  price?: number | undefined;
                                                  currency?: string | undefined;
                                                  sku?: string | undefined;
                                                  availableQuantity?:
                                                    | number
                                                    | undefined;
                                                  slug?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  picturesCollection?:
                                                    | {
                                                        __typename?: 'AssetCollection';
                                                        items: Array<
                                                          | {
                                                              __typename?: 'Asset';
                                                              title?:
                                                                | string
                                                                | undefined;
                                                              url?:
                                                                | string
                                                                | undefined;
                                                              sys: {
                                                                __typename?: 'Sys';
                                                                publishedAt?:
                                                                  | any
                                                                  | undefined;
                                                              };
                                                            }
                                                          | undefined
                                                        >;
                                                      }
                                                    | undefined;
                                                  category?:
                                                    | {
                                                        __typename?: 'ProductCategory';
                                                        name?:
                                                          | string
                                                          | undefined;
                                                        icon?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionSectionPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'SectionPost';
                                      title?: string | undefined;
                                      showTitle?: boolean | undefined;
                                      columnWidth?: string | undefined;
                                      alignCenter?: boolean | undefined;
                                      titleSize?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      richDescription?:
                                        | {
                                            __typename?: 'SectionPostDescription';
                                            json: any;
                                          }
                                        | undefined;
                                      chartPost?:
                                        | {
                                            __typename?: 'ChartPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            chartType?: string | undefined;
                                            chartData?: any | undefined;
                                            chartOptions?: any | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      embedPost?:
                                        | {
                                            __typename?: 'EmbedPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            embedCode?: string | undefined;
                                            scriptUrl?: string | undefined;
                                            aspectRatio?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionThumbnailPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'ThumbnailPost';
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      link?: string | undefined;
                                      isVideo?: boolean | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type PageStreamCollectionQueryVariables = Exact<{
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type PageStreamCollectionQuery = {
  __typename?: 'Query';
  pageStreamCollection?:
    | {
        __typename?: 'PageStreamCollection';
        items: Array<
          | {
              __typename?: 'PageStream';
              mainTitle?: string | undefined;
              showTitle?: boolean | undefined;
              subtitle?: string | undefined;
              showSubtitle?: boolean | undefined;
              headerColumnWidth?: string | undefined;
              headerAlignCenter?: boolean | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              ctasCollection?:
                | {
                    __typename?: 'PageStreamCtasCollection';
                    items: Array<
                      | {
                          __typename?: 'CallToAction';
                          label?: string | undefined;
                          externalLink?: string | undefined;
                          routerLink?: any | undefined;
                          type?: string | undefined;
                          style?: string | undefined;
                          size?: string | undefined;
                          icon?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              sectionsCollection?:
                | {
                    __typename?: 'PageStreamSectionsCollection';
                    items: Array<
                      | {
                          __typename: 'PageSectionBasicPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionBasicPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'BasicPost';
                                      summary?: string | undefined;
                                      slug?: string | undefined;
                                      title?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      mainPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                          postsByCategory?:
                            | {
                                __typename?: 'BasicPostCategory';
                                linkedFrom?:
                                  | {
                                      __typename?: 'BasicPostCategoryLinkingCollections';
                                      basicPostCollection?:
                                        | {
                                            __typename?: 'BasicPostCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'BasicPost';
                                                  summary?: string | undefined;
                                                  slug?: string | undefined;
                                                  title?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                  mainPicture?:
                                                    | {
                                                        __typename?: 'Asset';
                                                        title?:
                                                          | string
                                                          | undefined;
                                                        url?:
                                                          | string
                                                          | undefined;
                                                        sys: {
                                                          __typename?: 'Sys';
                                                          publishedAt?:
                                                            | any
                                                            | undefined;
                                                        };
                                                      }
                                                    | undefined;
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionDappPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionDappPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'DappPost';
                                      icon?: string | undefined;
                                      iconTitle?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      urlToDapp?: string | undefined;
                                      urlToLearnMore?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFaQs';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedFaqGroupsCollection?:
                            | {
                                __typename?: 'PageSectionFaQsHandpickedFAQGroupsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FaqGroup';
                                      name?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      faqItemCollection?:
                                        | {
                                            __typename?: 'FaqGroupFaqItemCollection';
                                            items: Array<
                                              | {
                                                  __typename?: 'FaqItem';
                                                  question?: string | undefined;
                                                  answer?: string | undefined;
                                                  sys: {
                                                    __typename?: 'Sys';
                                                    publishedAt?:
                                                      | any
                                                      | undefined;
                                                  };
                                                }
                                              | undefined
                                            >;
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionFeaturePosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionFeaturePostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'FeaturePost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionGrandPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionGrandPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'GrandPost';
                                      videoUrl?: string | undefined;
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      subtitle?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionIconTiles';
                          title?: string | undefined;
                          description?: string | undefined;
                          isSwiper?: boolean | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedIconTilesCollection?:
                            | {
                                __typename?: 'PageSectionIconTilesHandpickedIconTilesCollection';
                                items: Array<
                                  | {
                                      __typename?: 'IconTile';
                                      icon?: string | undefined;
                                      title?: string | undefined;
                                      description?: string | undefined;
                                      callToActionUrl?: string | undefined;
                                      callToActionButtonLabel?:
                                        | string
                                        | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionSectionPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionSectionPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'SectionPost';
                                      title?: string | undefined;
                                      showTitle?: boolean | undefined;
                                      columnWidth?: string | undefined;
                                      alignCenter?: boolean | undefined;
                                      titleSize?: string | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      richDescription?:
                                        | {
                                            __typename?: 'SectionPostDescription';
                                            json: any;
                                          }
                                        | undefined;
                                      chartPost?:
                                        | {
                                            __typename?: 'ChartPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            chartType?: string | undefined;
                                            chartData?: any | undefined;
                                            chartOptions?: any | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      embedPost?:
                                        | {
                                            __typename?: 'EmbedPost';
                                            title?: string | undefined;
                                            hideTitle?: boolean | undefined;
                                            embedCode?: string | undefined;
                                            scriptUrl?: string | undefined;
                                            aspectRatio?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | {
                          __typename: 'PageSectionThumbnailPosts';
                          title?: string | undefined;
                          description?: string | undefined;
                          swiperResponsiveOptions?: any | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                          handpickedPostsCollection?:
                            | {
                                __typename?: 'PageSectionThumbnailPostsHandpickedPostsCollection';
                                items: Array<
                                  | {
                                      __typename?: 'ThumbnailPost';
                                      showHeavyPictureOnHover?:
                                        | boolean
                                        | undefined;
                                      title?: string | undefined;
                                      link?: string | undefined;
                                      isVideo?: boolean | undefined;
                                      sys: {
                                        __typename?: 'Sys';
                                        publishedAt?: any | undefined;
                                      };
                                      picture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                      heavyPicture?:
                                        | {
                                            __typename?: 'Asset';
                                            title?: string | undefined;
                                            url?: string | undefined;
                                            sys: {
                                              __typename?: 'Sys';
                                              publishedAt?: any | undefined;
                                            };
                                          }
                                        | undefined;
                                    }
                                  | undefined
                                >;
                              }
                            | undefined;
                        }
                      | undefined
                    >;
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export type ProductCollectionBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  isPreview?: InputMaybe<Scalars['Boolean']>;
}>;

export type ProductCollectionBySlugQuery = {
  __typename?: 'Query';
  productCollection?:
    | {
        __typename?: 'ProductCollection';
        items: Array<
          | {
              __typename?: 'Product';
              availableColors?: Array<string | undefined> | undefined;
              availableSizes?: Array<string | undefined> | undefined;
              name?: string | undefined;
              price?: number | undefined;
              currency?: string | undefined;
              sku?: string | undefined;
              availableQuantity?: number | undefined;
              slug?: string | undefined;
              fullDescription?:
                | { __typename?: 'ProductFullDescription'; json: any }
                | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
              picturesCollection?:
                | {
                    __typename?: 'AssetCollection';
                    items: Array<
                      | {
                          __typename?: 'Asset';
                          title?: string | undefined;
                          url?: string | undefined;
                          sys: {
                            __typename?: 'Sys';
                            publishedAt?: any | undefined;
                          };
                        }
                      | undefined
                    >;
                  }
                | undefined;
              category?:
                | {
                    __typename?: 'ProductCategory';
                    name?: string | undefined;
                    icon?: string | undefined;
                    sys: { __typename?: 'Sys'; publishedAt?: any | undefined };
                  }
                | undefined;
            }
          | undefined
        >;
      }
    | undefined;
};

export const SysFragmentDoc = gql`
  fragment Sys on Sys {
    publishedAt
  }
`;
export const BasicPostCommonFragmentDoc = gql`
  fragment BasicPostCommon on BasicPost {
    sys {
      ...Sys
    }
    title
    mainPicture(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
  }
  ${SysFragmentDoc}
`;
export const BasicPostDetailFragmentDoc = gql`
  fragment BasicPostDetail on BasicPost {
    ...BasicPostCommon
    description {
      json
    }
  }
  ${BasicPostCommonFragmentDoc}
`;
export const CallToActionFragmentDoc = gql`
  fragment CallToAction on CallToAction {
    sys {
      ...Sys
    }
    label
    externalLink
    routerLink
    type
    style
    size
    icon
  }
  ${SysFragmentDoc}
`;
export const FooterFragmentDoc = gql`
  fragment Footer on Footer {
    sys {
      ...Sys
    }
    copyright
    linksCollection(limit: 20, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    socialIconsCollection(limit: 10, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
`;
export const LegalPostFragmentDoc = gql`
  fragment LegalPost on LegalPost {
    sys {
      ...Sys
    }
    title
    description {
      json
    }
    slug
  }
  ${SysFragmentDoc}
`;
export const FeaturePostFragmentDoc = gql`
  fragment FeaturePost on FeaturePost {
    sys {
      ...Sys
    }
    videoUrl
    picture(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
    heavyPicture(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
    showHeavyPictureOnHover
    title
    description
    callToActionUrl
    callToActionButtonLabel
  }
  ${SysFragmentDoc}
`;
export const PageSectionFeaturePostsFragmentDoc = gql`
  fragment PageSectionFeaturePosts on PageSectionFeaturePosts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedPostsCollection(limit: 20, preview: $isPreview) {
      items {
        ...FeaturePost
      }
    }
    swiperResponsiveOptions
  }
  ${SysFragmentDoc}
  ${FeaturePostFragmentDoc}
`;
export const ThumbnailPostFragmentDoc = gql`
  fragment ThumbnailPost on ThumbnailPost {
    sys {
      ...Sys
    }
    picture(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
    heavyPicture(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
    showHeavyPictureOnHover
    title
    link
    isVideo
  }
  ${SysFragmentDoc}
`;
export const PageSectionThumbnailPostsFragmentDoc = gql`
  fragment PageSectionThumbnailPosts on PageSectionThumbnailPosts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedPostsCollection(limit: 20, preview: $isPreview) {
      items {
        ...ThumbnailPost
      }
    }
    swiperResponsiveOptions
  }
  ${SysFragmentDoc}
  ${ThumbnailPostFragmentDoc}
`;
export const BasicPostFragmentDoc = gql`
  fragment BasicPost on BasicPost {
    ...BasicPostCommon
    summary
    slug
  }
  ${BasicPostCommonFragmentDoc}
`;
export const PageSectionBasicPostsFragmentDoc = gql`
  fragment PageSectionBasicPosts on PageSectionBasicPosts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedPostsCollection(limit: 5, preview: $isPreview) {
      items {
        ...BasicPost
      }
    }
    postsByCategory {
      linkedFrom {
        basicPostCollection(limit: 20, preview: $isPreview) {
          items {
            ...BasicPost
          }
        }
      }
    }
    swiperResponsiveOptions
  }
  ${SysFragmentDoc}
  ${BasicPostFragmentDoc}
`;
export const IconTileFragmentDoc = gql`
  fragment IconTile on IconTile {
    sys {
      ...Sys
    }
    icon
    title
    description
    callToActionUrl
    callToActionButtonLabel
  }
  ${SysFragmentDoc}
`;
export const PageSectionIconTilesFragmentDoc = gql`
  fragment PageSectionIconTiles on PageSectionIconTiles {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedIconTilesCollection(limit: 20, preview: $isPreview) {
      items {
        ...IconTile
      }
    }
    isSwiper
    swiperResponsiveOptions
  }
  ${SysFragmentDoc}
  ${IconTileFragmentDoc}
`;
export const FaqItemFragmentDoc = gql`
  fragment FaqItem on FaqItem {
    sys {
      ...Sys
    }
    question
    answer
  }
  ${SysFragmentDoc}
`;
export const FaqGroupFragmentDoc = gql`
  fragment FaqGroup on FaqGroup {
    sys {
      ...Sys
    }
    name
    faqItemCollection(limit: 50, preview: $isPreview) {
      items {
        ...FaqItem
      }
    }
  }
  ${SysFragmentDoc}
  ${FaqItemFragmentDoc}
`;
export const PageSectionFaQsFragmentDoc = gql`
  fragment PageSectionFaQs on PageSectionFaQs {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedFaqGroupsCollection(limit: 5, preview: $isPreview) {
      items {
        ...FaqGroup
      }
    }
  }
  ${SysFragmentDoc}
  ${FaqGroupFragmentDoc}
`;
export const GrandPostFragmentDoc = gql`
  fragment GrandPost on GrandPost {
    sys {
      ...Sys
    }
    videoUrl
    picture(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
    heavyPicture(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
    showHeavyPictureOnHover
    title
    subtitle
    description
    callToActionUrl
    callToActionButtonLabel
  }
  ${SysFragmentDoc}
`;
export const PageSectionGrandPostsFragmentDoc = gql`
  fragment PageSectionGrandPosts on PageSectionGrandPosts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedPostsCollection(limit: 20, preview: $isPreview) {
      items {
        ...GrandPost
      }
    }
    isSwiper
    swiperResponsiveOptions
  }
  ${SysFragmentDoc}
  ${GrandPostFragmentDoc}
`;
export const ChartPostFragmentDoc = gql`
  fragment ChartPost on ChartPost {
    sys {
      ...Sys
    }
    title
    hideTitle
    chartType
    chartData
    chartOptions
  }
  ${SysFragmentDoc}
`;
export const EmbedPostFragmentDoc = gql`
  fragment EmbedPost on EmbedPost {
    sys {
      ...Sys
    }
    title
    hideTitle
    embedCode
    scriptUrl
    aspectRatio
  }
  ${SysFragmentDoc}
`;
export const SectionPostFragmentDoc = gql`
  fragment SectionPost on SectionPost {
    sys {
      ...Sys
    }
    title
    showTitle
    richDescription: description {
      json
    }
    chartPost {
      ...ChartPost
    }
    embedPost {
      ...EmbedPost
    }
    columnWidth
    alignCenter
    titleSize
  }
  ${SysFragmentDoc}
  ${ChartPostFragmentDoc}
  ${EmbedPostFragmentDoc}
`;
export const PageSectionSectionPostsFragmentDoc = gql`
  fragment PageSectionSectionPosts on PageSectionSectionPosts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedPostsCollection(limit: 5, preview: $isPreview) {
      items {
        ...SectionPost
      }
    }
  }
  ${SysFragmentDoc}
  ${SectionPostFragmentDoc}
`;
export const PageAccessWallFragmentDoc = gql`
  fragment PageAccessWall on PageAccessWall {
    sys {
      ...Sys
    }
    mainTitle
    showTitle
    subtitle
    showSubtitle
    ctasCollection(limit: 3, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    headerColumnWidth
    headerAlignCenter
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionGrandPosts
        ...PageSectionSectionPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionGrandPostsFragmentDoc}
  ${PageSectionSectionPostsFragmentDoc}
`;
export const DappPostFragmentDoc = gql`
  fragment DappPost on DappPost {
    sys {
      ...Sys
    }
    icon
    iconTitle
    title
    description
    urlToDapp
    urlToLearnMore
  }
  ${SysFragmentDoc}
`;
export const PageSectionDappPostsFragmentDoc = gql`
  fragment PageSectionDappPosts on PageSectionDappPosts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedPostsCollection(limit: 5, preview: $isPreview) {
      items {
        ...DappPost
      }
    }
  }
  ${SysFragmentDoc}
  ${DappPostFragmentDoc}
`;
export const PageEarnFragmentDoc = gql`
  fragment PageEarn on PageEarn {
    sys {
      ...Sys
    }
    mainTitle
    showTitle
    subtitle
    showSubtitle
    ctasCollection(limit: 3, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    headerColumnWidth
    headerAlignCenter
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
        ...PageSectionGrandPosts
        ...PageSectionSectionPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
  ${PageSectionGrandPostsFragmentDoc}
  ${PageSectionSectionPostsFragmentDoc}
`;
export const PageGameFragmentDoc = gql`
  fragment PageGame on PageGame {
    sys {
      ...Sys
    }
    mainTitle
    showTitle
    subtitle
    showSubtitle
    ctasCollection(limit: 3, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    headerColumnWidth
    headerAlignCenter
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
        ...PageSectionGrandPosts
        ...PageSectionSectionPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
  ${PageSectionGrandPostsFragmentDoc}
  ${PageSectionSectionPostsFragmentDoc}
`;
export const PersonPostFragmentDoc = gql`
  fragment PersonPost on PersonPost {
    sys {
      ...Sys
    }
    avatar(preview: $isPreview) {
      sys {
        ...Sys
      }
      title
      url
    }
    name
    title
    description
    twitter
    linkedin
    instagram
    github
  }
  ${SysFragmentDoc}
`;
export const PageSectionPersonPostsFragmentDoc = gql`
  fragment PageSectionPersonPosts on PageSectionPersonPosts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedPostsCollection(limit: 20, preview: $isPreview) {
      items {
        ...PersonPost
      }
    }
    isSwiper
    swiperResponsiveOptions
  }
  ${SysFragmentDoc}
  ${PersonPostFragmentDoc}
`;
export const PageHomeFragmentDoc = gql`
  fragment PageHome on PageHome {
    sys {
      ...Sys
    }
    mainTitle
    showTitle
    subtitle
    showSubtitle
    ctasCollection(limit: 3, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    headerColumnWidth
    headerAlignCenter
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
        ...PageSectionGrandPosts
        ...PageSectionSectionPosts
        ...PageSectionPersonPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
  ${PageSectionGrandPostsFragmentDoc}
  ${PageSectionSectionPostsFragmentDoc}
  ${PageSectionPersonPostsFragmentDoc}
`;
export const PageLearnFragmentDoc = gql`
  fragment PageLearn on PageLearn {
    sys {
      ...Sys
    }
    mainTitle
    showTitle
    subtitle
    showSubtitle
    ctasCollection(limit: 3, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    headerColumnWidth
    headerAlignCenter
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
        ...PageSectionGrandPosts
        ...PageSectionSectionPosts
        ...PageSectionPersonPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
  ${PageSectionGrandPostsFragmentDoc}
  ${PageSectionSectionPostsFragmentDoc}
  ${PageSectionPersonPostsFragmentDoc}
`;
export const ProductCommonFragmentDoc = gql`
  fragment ProductCommon on Product {
    sys {
      ...Sys
    }
    picturesCollection(limit: 10, preview: $isPreview) {
      items {
        sys {
          ...Sys
        }
        title
        url
      }
    }
    name
    price
    currency
    sku
    availableQuantity
    slug
    category {
      sys {
        ...Sys
      }
      name
      icon
    }
  }
  ${SysFragmentDoc}
`;
export const ProductFragmentDoc = gql`
  fragment Product on Product {
    ...ProductCommon
    shortDescription
  }
  ${ProductCommonFragmentDoc}
`;
export const PageSectionProductsFragmentDoc = gql`
  fragment PageSectionProducts on PageSectionProducts {
    __typename
    sys {
      ...Sys
    }
    title
    description
    handpickedProductsCollection(limit: 5, preview: $isPreview) {
      items {
        ...Product
      }
    }
    productsByCategory {
      linkedFrom {
        productCollection(limit: 20, preview: $isPreview) {
          items {
            ...Product
          }
        }
      }
    }
    swiperResponsiveOptions
  }
  ${SysFragmentDoc}
  ${ProductFragmentDoc}
`;
export const PageShopFragmentDoc = gql`
  fragment PageShop on PageShop {
    sys {
      ...Sys
    }
    mainTitle
    showTitle
    subtitle
    showSubtitle
    ctasCollection(limit: 3, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    headerColumnWidth
    headerAlignCenter
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionGrandPosts
        ...PageSectionSectionPosts
        ...PageSectionPersonPosts
        ...PageSectionProducts
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionGrandPostsFragmentDoc}
  ${PageSectionSectionPostsFragmentDoc}
  ${PageSectionPersonPostsFragmentDoc}
  ${PageSectionProductsFragmentDoc}
`;
export const PageStreamFragmentDoc = gql`
  fragment PageStream on PageStream {
    sys {
      ...Sys
    }
    mainTitle
    showTitle
    subtitle
    showSubtitle
    ctasCollection(limit: 3, preview: $isPreview) {
      items {
        ...CallToAction
      }
    }
    headerColumnWidth
    headerAlignCenter
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
        ...PageSectionGrandPosts
        ...PageSectionSectionPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${CallToActionFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
  ${PageSectionGrandPostsFragmentDoc}
  ${PageSectionSectionPostsFragmentDoc}
`;
export const ProductDetailFragmentDoc = gql`
  fragment ProductDetail on Product {
    ...ProductCommon
    fullDescription {
      json
    }
    availableColors
    availableSizes
  }
  ${ProductCommonFragmentDoc}
`;
export const BasicPostCollectionBySlugDocument = gql`
  query basicPostCollectionBySlug($slug: String, $isPreview: Boolean = false) {
    basicPostCollection(where: { slug: $slug }, limit: 1, preview: $isPreview) {
      items {
        ...BasicPostDetail
      }
    }
  }
  ${BasicPostDetailFragmentDoc}
`;
export const FooterCollectionDocument = gql`
  query footerCollection($isPreview: Boolean = false) {
    footerCollection(limit: 2, preview: $isPreview) {
      items {
        ...Footer
      }
    }
  }
  ${FooterFragmentDoc}
`;
export const LegalPostCollectionBySlugDocument = gql`
  query legalPostCollectionBySlug($slug: String, $isPreview: Boolean = false) {
    legalPostCollection(where: { slug: $slug }, limit: 1, preview: $isPreview) {
      items {
        ...LegalPost
      }
    }
  }
  ${LegalPostFragmentDoc}
`;
export const PageAccessWallCollectionDocument = gql`
  query pageAccessWallCollection($isPreview: Boolean = false) {
    pageAccessWallCollection(limit: 2, preview: $isPreview) {
      items {
        ...PageAccessWall
      }
    }
  }
  ${PageAccessWallFragmentDoc}
`;
export const PageEarnCollectionDocument = gql`
  query pageEarnCollection($isPreview: Boolean = false) {
    pageEarnCollection(limit: 2, preview: $isPreview) {
      items {
        ...PageEarn
      }
    }
  }
  ${PageEarnFragmentDoc}
`;
export const PageGameCollectionDocument = gql`
  query pageGameCollection($isPreview: Boolean = false) {
    pageGameCollection(limit: 2, preview: $isPreview) {
      items {
        ...PageGame
      }
    }
  }
  ${PageGameFragmentDoc}
`;
export const PageHomeCollectionDocument = gql`
  query pageHomeCollection($isPreview: Boolean = false) {
    pageHomeCollection(limit: 2, preview: $isPreview) {
      items {
        ...PageHome
      }
    }
  }
  ${PageHomeFragmentDoc}
`;
export const PageLearnCollectionDocument = gql`
  query pageLearnCollection($isPreview: Boolean = false) {
    pageLearnCollection(limit: 2, preview: $isPreview) {
      items {
        ...PageLearn
      }
    }
  }
  ${PageLearnFragmentDoc}
`;
export const PageShopCollectionDocument = gql`
  query pageShopCollection($isPreview: Boolean = false) {
    pageShopCollection(limit: 2, preview: $isPreview) {
      items {
        ...PageShop
      }
    }
  }
  ${PageShopFragmentDoc}
`;
export const PageStreamCollectionDocument = gql`
  query pageStreamCollection($isPreview: Boolean = false) {
    pageStreamCollection(limit: 2, preview: $isPreview) {
      items {
        ...PageStream
      }
    }
  }
  ${PageStreamFragmentDoc}
`;
export const ProductCollectionBySlugDocument = gql`
  query productCollectionBySlug($slug: String, $isPreview: Boolean = false) {
    productCollection(where: { slug: $slug }, limit: 1, preview: $isPreview) {
      items {
        ...ProductDetail
      }
    }
  }
  ${ProductDetailFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    basicPostCollectionBySlug(
      variables?: BasicPostCollectionBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BasicPostCollectionBySlugQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<BasicPostCollectionBySlugQuery>(
            BasicPostCollectionBySlugDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'basicPostCollectionBySlug'
      );
    },
    footerCollection(
      variables?: FooterCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<FooterCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<FooterCollectionQuery>(
            FooterCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'footerCollection'
      );
    },
    legalPostCollectionBySlug(
      variables?: LegalPostCollectionBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<LegalPostCollectionBySlugQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<LegalPostCollectionBySlugQuery>(
            LegalPostCollectionBySlugDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'legalPostCollectionBySlug'
      );
    },
    pageAccessWallCollection(
      variables?: PageAccessWallCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageAccessWallCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PageAccessWallCollectionQuery>(
            PageAccessWallCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'pageAccessWallCollection'
      );
    },
    pageEarnCollection(
      variables?: PageEarnCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageEarnCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PageEarnCollectionQuery>(
            PageEarnCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'pageEarnCollection'
      );
    },
    pageGameCollection(
      variables?: PageGameCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageGameCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PageGameCollectionQuery>(
            PageGameCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'pageGameCollection'
      );
    },
    pageHomeCollection(
      variables?: PageHomeCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageHomeCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PageHomeCollectionQuery>(
            PageHomeCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'pageHomeCollection'
      );
    },
    pageLearnCollection(
      variables?: PageLearnCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageLearnCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PageLearnCollectionQuery>(
            PageLearnCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'pageLearnCollection'
      );
    },
    pageShopCollection(
      variables?: PageShopCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageShopCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PageShopCollectionQuery>(
            PageShopCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'pageShopCollection'
      );
    },
    pageStreamCollection(
      variables?: PageStreamCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageStreamCollectionQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PageStreamCollectionQuery>(
            PageStreamCollectionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'pageStreamCollection'
      );
    },
    productCollectionBySlug(
      variables?: ProductCollectionBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ProductCollectionBySlugQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ProductCollectionBySlugQuery>(
            ProductCollectionBySlugDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'productCollectionBySlug'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
