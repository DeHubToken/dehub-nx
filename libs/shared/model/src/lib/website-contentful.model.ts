/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | undefined;
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
  locale?: Maybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetDescriptionArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetFileNameArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetHeightArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetSizeArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetUrlArgs {
  locale?: Maybe<Scalars['String']>;
  transform?: Maybe<ImageTransformOptions>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetWidthArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface AssetCollection {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface AssetFilter {
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  contentType?: Maybe<Scalars['String']>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName?: Maybe<Scalars['String']>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  height?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size?: Maybe<Scalars['Int']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  width?: Maybe<Scalars['Int']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
}

export interface AssetLinkingCollections {
  __typename?: 'AssetLinkingCollections';
  basicPostCollection?: Maybe<BasicPostCollection>;
  entryCollection?: Maybe<EntryCollection>;
  featurePostCollection?: Maybe<FeaturePostCollection>;
  ppvCollection?: Maybe<PpvCollection>;
  ppvNftSliderPostCollection?: Maybe<PpvNftSliderPostCollection>;
  ppvSliderPostCollection?: Maybe<PpvSliderPostCollection>;
  ppvWebsiteBackgroundCollection?: Maybe<PpvWebsiteBackgroundCollection>;
  teamMemberCollection?: Maybe<TeamMemberCollection>;
  tournamentCollection?: Maybe<TournamentCollection>;
  tournamentSeriesCollection?: Maybe<TournamentSeriesCollection>;
}

export interface AssetLinkingCollectionsBasicPostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsFeaturePostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsPpvCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsPpvNftSliderPostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsPpvSliderPostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsPpvWebsiteBackgroundCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsTeamMemberCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsTournamentCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface AssetLinkingCollectionsTournamentSeriesCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostDescriptionArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostMainPictureArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostSlugArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostSummaryArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Basic post model for simple announcements, news posts, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPost) */
export interface BasicPostTitleArgs {
  locale?: Maybe<Scalars['String']>;
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
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** A category for the basic post allows filtering basic posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/basicPostCategory) */
export interface BasicPostCategoryNameArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface BasicPostCategoryCollection {
  __typename?: 'BasicPostCategoryCollection';
  items: Array<Maybe<BasicPostCategory>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface BasicPostCategoryFilter {
  AND?: Maybe<Array<Maybe<BasicPostCategoryFilter>>>;
  OR?: Maybe<Array<Maybe<BasicPostCategoryFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
}

export interface BasicPostCategoryLinkingCollections {
  __typename?: 'BasicPostCategoryLinkingCollections';
  basicPostCollection?: Maybe<BasicPostCollection>;
  entryCollection?: Maybe<EntryCollection>;
  pageSectionBasicPostsCollection?: Maybe<PageSectionBasicPostsCollection>;
}

export interface BasicPostCategoryLinkingCollectionsBasicPostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface BasicPostCategoryLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface BasicPostCategoryLinkingCollectionsPageSectionBasicPostsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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
  AND?: Maybe<Array<Maybe<BasicPostFilter>>>;
  OR?: Maybe<Array<Maybe<BasicPostFilter>>>;
  category?: Maybe<CfBasicPostCategoryNestedFilter>;
  category_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_not_contains?: Maybe<Scalars['String']>;
  mainPicture_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  summary?: Maybe<Scalars['String']>;
  summary_contains?: Maybe<Scalars['String']>;
  summary_exists?: Maybe<Scalars['Boolean']>;
  summary_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not?: Maybe<Scalars['String']>;
  summary_not_contains?: Maybe<Scalars['String']>;
  summary_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface BasicPostLinkingCollections {
  __typename?: 'BasicPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionBasicPostsCollection?: Maybe<PageSectionBasicPostsCollection>;
}

export interface BasicPostLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface BasicPostLinkingCollectionsPageSectionBasicPostsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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

export interface ContentfulMetadata {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
}

export interface ContentfulMetadataFilter {
  tags?: Maybe<ContentfulMetadataTagsFilter>;
  tags_exists?: Maybe<Scalars['Boolean']>;
}

export interface ContentfulMetadataTagsFilter {
  id_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  AND?: Maybe<Array<Maybe<EntryFilter>>>;
  OR?: Maybe<Array<Maybe<EntryFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
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
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** A collection of FAQ questions. Use this to create separate groups of FAQ questions for different pages, sections, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqGroup) */
export interface FaqGroupLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** A collection of FAQ questions. Use this to create separate groups of FAQ questions for different pages, sections, etc. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqGroup) */
export interface FaqGroupNameArgs {
  locale?: Maybe<Scalars['String']>;
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
  AND?: Maybe<Array<Maybe<FaqGroupFilter>>>;
  OR?: Maybe<Array<Maybe<FaqGroupFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  faqItemCollection_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
}

export interface FaqGroupLinkingCollections {
  __typename?: 'FaqGroupLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionFaQsCollection?: Maybe<PageSectionFaQsCollection>;
}

export interface FaqGroupLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface FaqGroupLinkingCollectionsPageSectionFaQsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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
  locale?: Maybe<Scalars['String']>;
}

/** A single FAQ item which can be used in different FAQ collections. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqItem) */
export interface FaqItemLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** A single FAQ item which can be used in different FAQ collections. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/faqItem) */
export interface FaqItemQuestionArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface FaqItemCollection {
  __typename?: 'FaqItemCollection';
  items: Array<Maybe<FaqItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface FaqItemFilter {
  AND?: Maybe<Array<Maybe<FaqItemFilter>>>;
  OR?: Maybe<Array<Maybe<FaqItemFilter>>>;
  answer?: Maybe<Scalars['String']>;
  answer_contains?: Maybe<Scalars['String']>;
  answer_exists?: Maybe<Scalars['Boolean']>;
  answer_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  answer_not?: Maybe<Scalars['String']>;
  answer_not_contains?: Maybe<Scalars['String']>;
  answer_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  question?: Maybe<Scalars['String']>;
  question_contains?: Maybe<Scalars['String']>;
  question_exists?: Maybe<Scalars['Boolean']>;
  question_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  question_not?: Maybe<Scalars['String']>;
  question_not_contains?: Maybe<Scalars['String']>;
  question_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
}

export interface FaqItemLinkingCollections {
  __typename?: 'FaqItemLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  faqGroupCollection?: Maybe<FaqGroupCollection>;
}

export interface FaqItemLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface FaqItemLinkingCollectionsFaqGroupCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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
  linkedFrom?: Maybe<FeaturePostLinkingCollections>;
  picture?: Maybe<Asset>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostCallToActionButtonLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostCallToActionUrlArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostDescriptionArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostPictureArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A short, but impactful post with a video or a picture and a call to action button. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/featurePost) */
export interface FeaturePostVideoUrlArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface FeaturePostCollection {
  __typename?: 'FeaturePostCollection';
  items: Array<Maybe<FeaturePost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface FeaturePostFilter {
  AND?: Maybe<Array<Maybe<FeaturePostFilter>>>;
  OR?: Maybe<Array<Maybe<FeaturePostFilter>>>;
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionButtonLabel_contains?: Maybe<Scalars['String']>;
  callToActionButtonLabel_exists?: Maybe<Scalars['Boolean']>;
  callToActionButtonLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLabel_not?: Maybe<Scalars['String']>;
  callToActionButtonLabel_not_contains?: Maybe<Scalars['String']>;
  callToActionButtonLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionUrl?: Maybe<Scalars['String']>;
  callToActionUrl_contains?: Maybe<Scalars['String']>;
  callToActionUrl_exists?: Maybe<Scalars['Boolean']>;
  callToActionUrl_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionUrl_not?: Maybe<Scalars['String']>;
  callToActionUrl_not_contains?: Maybe<Scalars['String']>;
  callToActionUrl_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  picture_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  videoUrl?: Maybe<Scalars['String']>;
  videoUrl_contains?: Maybe<Scalars['String']>;
  videoUrl_exists?: Maybe<Scalars['Boolean']>;
  videoUrl_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  videoUrl_not?: Maybe<Scalars['String']>;
  videoUrl_not_contains?: Maybe<Scalars['String']>;
  videoUrl_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface FeaturePostLinkingCollections {
  __typename?: 'FeaturePostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionFeaturePostsCollection?: Maybe<PageSectionFeaturePostsCollection>;
}

export interface FeaturePostLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface FeaturePostLinkingCollectionsPageSectionFeaturePostsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum FeaturePostOrder {
  CallToActionButtonLabelAsc = 'callToActionButtonLabel_ASC',
  CallToActionButtonLabelDesc = 'callToActionButtonLabel_DESC',
  CallToActionUrlAsc = 'callToActionUrl_ASC',
  CallToActionUrlDesc = 'callToActionUrl_DESC',
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
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<IconTileLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileDescriptionArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileIconArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Simple decorative tile element with icon, title, and short description. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/iconTile) */
export interface IconTileTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface IconTileCollection {
  __typename?: 'IconTileCollection';
  items: Array<Maybe<IconTile>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface IconTileFilter {
  AND?: Maybe<Array<Maybe<IconTileFilter>>>;
  OR?: Maybe<Array<Maybe<IconTileFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  icon?: Maybe<Scalars['String']>;
  icon_contains?: Maybe<Scalars['String']>;
  icon_exists?: Maybe<Scalars['Boolean']>;
  icon_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  icon_not?: Maybe<Scalars['String']>;
  icon_not_contains?: Maybe<Scalars['String']>;
  icon_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface IconTileLinkingCollections {
  __typename?: 'IconTileLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageSectionIconTilesCollection?: Maybe<PageSectionIconTilesCollection>;
}

export interface IconTileLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface IconTileLinkingCollectionsPageSectionIconTilesCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum IconTileOrder {
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
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHome extends Entry {
  __typename?: 'PageHome';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<PageHomeLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageHomeSectionsCollection>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeMainTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeSectionsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Home page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageHome) */
export interface PageHomeSubtitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PageHomeCollection {
  __typename?: 'PageHomeCollection';
  items: Array<Maybe<PageHome>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageHomeFilter {
  AND?: Maybe<Array<Maybe<PageHomeFilter>>>;
  OR?: Maybe<Array<Maybe<PageHomeFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  mainTitle?: Maybe<Scalars['String']>;
  mainTitle_contains?: Maybe<Scalars['String']>;
  mainTitle_exists?: Maybe<Scalars['Boolean']>;
  mainTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  mainTitle_not?: Maybe<Scalars['String']>;
  mainTitle_not_contains?: Maybe<Scalars['String']>;
  mainTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sectionsCollection_exists?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  subtitle_contains?: Maybe<Scalars['String']>;
  subtitle_exists?: Maybe<Scalars['Boolean']>;
  subtitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  subtitle_not?: Maybe<Scalars['String']>;
  subtitle_not_contains?: Maybe<Scalars['String']>;
  subtitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
}

export interface PageHomeLinkingCollections {
  __typename?: 'PageHomeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageHomeLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum PageHomeOrder {
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
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
  | PageSectionFaQs
  | PageSectionIconTiles;

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearn extends Entry {
  __typename?: 'PageLearn';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<PageLearnLinkingCollections>;
  mainTitle?: Maybe<Scalars['String']>;
  sectionsCollection?: Maybe<PageLearnSectionsCollection>;
  subtitle?: Maybe<Scalars['String']>;
  sys: Sys;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnMainTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnSectionsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Learn page structure and content. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageLearn) */
export interface PageLearnSubtitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PageLearnCollection {
  __typename?: 'PageLearnCollection';
  items: Array<Maybe<PageLearn>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageLearnFilter {
  AND?: Maybe<Array<Maybe<PageLearnFilter>>>;
  OR?: Maybe<Array<Maybe<PageLearnFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  mainTitle?: Maybe<Scalars['String']>;
  mainTitle_contains?: Maybe<Scalars['String']>;
  mainTitle_exists?: Maybe<Scalars['Boolean']>;
  mainTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  mainTitle_not?: Maybe<Scalars['String']>;
  mainTitle_not_contains?: Maybe<Scalars['String']>;
  mainTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sectionsCollection_exists?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  subtitle_contains?: Maybe<Scalars['String']>;
  subtitle_exists?: Maybe<Scalars['Boolean']>;
  subtitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  subtitle_not?: Maybe<Scalars['String']>;
  subtitle_not_contains?: Maybe<Scalars['String']>;
  subtitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
}

export interface PageLearnLinkingCollections {
  __typename?: 'PageLearnLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PageLearnLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum PageLearnOrder {
  MainTitleAsc = 'mainTitle_ASC',
  MainTitleDesc = 'mainTitle_DESC',
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
  | PageSectionFaQs
  | PageSectionIconTiles;

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPosts extends Entry {
  __typename?: 'PageSectionBasicPosts';
  contentfulMetadata: ContentfulMetadata;
  handpickedPostsCollection?: Maybe<PageSectionBasicPostsHandpickedPostsCollection>;
  linkedFrom?: Maybe<PageSectionBasicPostsLinkingCollections>;
  postsByCategory?: Maybe<BasicPostCategory>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsHandpickedPostsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsPostsByCategoryArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Page section with Basic Posts. Can display handpicked posts together with the posts from a certain category. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionBasicPosts) */
export interface PageSectionBasicPostsTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PageSectionBasicPostsCollection {
  __typename?: 'PageSectionBasicPostsCollection';
  items: Array<Maybe<PageSectionBasicPosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionBasicPostsFilter {
  AND?: Maybe<Array<Maybe<PageSectionBasicPostsFilter>>>;
  OR?: Maybe<Array<Maybe<PageSectionBasicPostsFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  handpickedPostsCollection_exists?: Maybe<Scalars['Boolean']>;
  postsByCategory?: Maybe<CfBasicPostCategoryNestedFilter>;
  postsByCategory_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
}

export interface PageSectionBasicPostsLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageHomeCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface PageSectionBasicPostsLinkingCollectionsPageLearnCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQs extends Entry {
  __typename?: 'PageSectionFaQs';
  contentfulMetadata: ContentfulMetadata;
  handpickedFaqGroupsCollection?: Maybe<PageSectionFaQsHandpickedFaqGroupsCollection>;
  linkedFrom?: Maybe<PageSectionFaQsLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQsHandpickedFaqGroupsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQsLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Page section with FAQs. Displays a limited amount of handpicked FAQ groups. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFaQs) */
export interface PageSectionFaQsTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PageSectionFaQsCollection {
  __typename?: 'PageSectionFaQsCollection';
  items: Array<Maybe<PageSectionFaQs>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionFaQsFilter {
  AND?: Maybe<Array<Maybe<PageSectionFaQsFilter>>>;
  OR?: Maybe<Array<Maybe<PageSectionFaQsFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  handpickedFAQGroupsCollection_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
}

export interface PageSectionFaQsLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageHomeCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface PageSectionFaQsLinkingCollectionsPageLearnCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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
  handpickedPostsCollection?: Maybe<PageSectionFeaturePostsHandpickedPostsCollection>;
  linkedFrom?: Maybe<PageSectionFeaturePostsLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsHandpickedPostsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Page section with Feature Posts. Displays handpicked posts. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionFeaturePosts) */
export interface PageSectionFeaturePostsTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PageSectionFeaturePostsCollection {
  __typename?: 'PageSectionFeaturePostsCollection';
  items: Array<Maybe<PageSectionFeaturePosts>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionFeaturePostsFilter {
  AND?: Maybe<Array<Maybe<PageSectionFeaturePostsFilter>>>;
  OR?: Maybe<Array<Maybe<PageSectionFeaturePostsFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  handpickedPostsCollection_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
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
}

export interface PageSectionFeaturePostsLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
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

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTiles extends Entry {
  __typename?: 'PageSectionIconTiles';
  contentfulMetadata: ContentfulMetadata;
  handpickedIconTilesCollection?: Maybe<PageSectionIconTilesHandpickedIconTilesCollection>;
  linkedFrom?: Maybe<PageSectionIconTilesLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesHandpickedIconTilesCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Page section with Icon Tiles. Displays a limited amount of handpicked icon tiles. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/pageSectionIconTiles) */
export interface PageSectionIconTilesTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PageSectionIconTilesCollection {
  __typename?: 'PageSectionIconTilesCollection';
  items: Array<Maybe<PageSectionIconTiles>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PageSectionIconTilesFilter {
  AND?: Maybe<Array<Maybe<PageSectionIconTilesFilter>>>;
  OR?: Maybe<Array<Maybe<PageSectionIconTilesFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  handpickedIconTilesCollection_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
}

export interface PageSectionIconTilesLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageHomeCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface PageSectionIconTilesLinkingCollectionsPageLearnCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum PageSectionIconTilesOrder {
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

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface Ppv extends Entry {
  __typename?: 'Ppv';
  badge?: Maybe<Scalars['String']>;
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionButtonLink?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  coverImage?: Maybe<Asset>;
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<PpvDescription>;
  featured?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<PpvLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvBadgeArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvCallToActionButtonLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvCallToActionButtonLinkArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvCoverImageArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvDateArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvDescriptionArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvFeaturedArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Pay-Per-View information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppv) */
export interface PpvTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PpvCollection {
  __typename?: 'PpvCollection';
  items: Array<Maybe<Ppv>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PpvDescription {
  __typename?: 'PpvDescription';
  json: Scalars['JSON'];
  links: PpvDescriptionLinks;
}

export interface PpvDescriptionAssets {
  __typename?: 'PpvDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
}

export interface PpvDescriptionEntries {
  __typename?: 'PpvDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
}

export interface PpvDescriptionLinks {
  __typename?: 'PpvDescriptionLinks';
  assets: PpvDescriptionAssets;
  entries: PpvDescriptionEntries;
}

export interface PpvFilter {
  AND?: Maybe<Array<Maybe<PpvFilter>>>;
  OR?: Maybe<Array<Maybe<PpvFilter>>>;
  badge?: Maybe<Scalars['String']>;
  badge_contains?: Maybe<Scalars['String']>;
  badge_exists?: Maybe<Scalars['Boolean']>;
  badge_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  badge_not?: Maybe<Scalars['String']>;
  badge_not_contains?: Maybe<Scalars['String']>;
  badge_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionButtonLabel_contains?: Maybe<Scalars['String']>;
  callToActionButtonLabel_exists?: Maybe<Scalars['Boolean']>;
  callToActionButtonLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLabel_not?: Maybe<Scalars['String']>;
  callToActionButtonLabel_not_contains?: Maybe<Scalars['String']>;
  callToActionButtonLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLink?: Maybe<Scalars['String']>;
  callToActionButtonLink_contains?: Maybe<Scalars['String']>;
  callToActionButtonLink_exists?: Maybe<Scalars['Boolean']>;
  callToActionButtonLink_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLink_not?: Maybe<Scalars['String']>;
  callToActionButtonLink_not_contains?: Maybe<Scalars['String']>;
  callToActionButtonLink_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  coverImage_exists?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['DateTime']>;
  date_exists?: Maybe<Scalars['Boolean']>;
  date_gt?: Maybe<Scalars['DateTime']>;
  date_gte?: Maybe<Scalars['DateTime']>;
  date_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  date_lt?: Maybe<Scalars['DateTime']>;
  date_lte?: Maybe<Scalars['DateTime']>;
  date_not?: Maybe<Scalars['DateTime']>;
  date_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_not_contains?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  featured_exists?: Maybe<Scalars['Boolean']>;
  featured_not?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface PpvLinkingCollections {
  __typename?: 'PpvLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PpvLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Pay-Per-View small slider post for NFT cards [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvNftSliderPost) */
export interface PpvNftSliderPost extends Entry {
  __typename?: 'PpvNftSliderPost';
  callToActionLink?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  coverImage?: Maybe<Asset>;
  linkedFrom?: Maybe<PpvNftSliderPostLinkingCollections>;
  rarity?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Pay-Per-View small slider post for NFT cards [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvNftSliderPost) */
export interface PpvNftSliderPostCallToActionLinkArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View small slider post for NFT cards [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvNftSliderPost) */
export interface PpvNftSliderPostCoverImageArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Pay-Per-View small slider post for NFT cards [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvNftSliderPost) */
export interface PpvNftSliderPostLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Pay-Per-View small slider post for NFT cards [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvNftSliderPost) */
export interface PpvNftSliderPostRarityArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View small slider post for NFT cards [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvNftSliderPost) */
export interface PpvNftSliderPostTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PpvNftSliderPostCollection {
  __typename?: 'PpvNftSliderPostCollection';
  items: Array<Maybe<PpvNftSliderPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PpvNftSliderPostFilter {
  AND?: Maybe<Array<Maybe<PpvNftSliderPostFilter>>>;
  OR?: Maybe<Array<Maybe<PpvNftSliderPostFilter>>>;
  callToActionLink?: Maybe<Scalars['String']>;
  callToActionLink_contains?: Maybe<Scalars['String']>;
  callToActionLink_exists?: Maybe<Scalars['Boolean']>;
  callToActionLink_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLink_not?: Maybe<Scalars['String']>;
  callToActionLink_not_contains?: Maybe<Scalars['String']>;
  callToActionLink_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  coverImage_exists?: Maybe<Scalars['Boolean']>;
  rarity?: Maybe<Scalars['String']>;
  rarity_contains?: Maybe<Scalars['String']>;
  rarity_exists?: Maybe<Scalars['Boolean']>;
  rarity_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  rarity_not?: Maybe<Scalars['String']>;
  rarity_not_contains?: Maybe<Scalars['String']>;
  rarity_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface PpvNftSliderPostLinkingCollections {
  __typename?: 'PpvNftSliderPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PpvNftSliderPostLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum PpvNftSliderPostOrder {
  CallToActionLinkAsc = 'callToActionLink_ASC',
  CallToActionLinkDesc = 'callToActionLink_DESC',
  RarityAsc = 'rarity_ASC',
  RarityDesc = 'rarity_DESC',
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

export enum PpvOrder {
  BadgeAsc = 'badge_ASC',
  BadgeDesc = 'badge_DESC',
  CallToActionButtonLabelAsc = 'callToActionButtonLabel_ASC',
  CallToActionButtonLabelDesc = 'callToActionButtonLabel_DESC',
  CallToActionButtonLinkAsc = 'callToActionButtonLink_ASC',
  CallToActionButtonLinkDesc = 'callToActionButtonLink_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  FeaturedAsc = 'featured_ASC',
  FeaturedDesc = 'featured_DESC',
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

/** Pay-Per-View small slider post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvSliderPost) */
export interface PpvSliderPost extends Entry {
  __typename?: 'PpvSliderPost';
  callToActionLink?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  coverImage?: Maybe<Asset>;
  description?: Maybe<PpvSliderPostDescription>;
  linkedFrom?: Maybe<PpvSliderPostLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Pay-Per-View small slider post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvSliderPost) */
export interface PpvSliderPostCallToActionLinkArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View small slider post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvSliderPost) */
export interface PpvSliderPostCoverImageArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Pay-Per-View small slider post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvSliderPost) */
export interface PpvSliderPostDescriptionArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Pay-Per-View small slider post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvSliderPost) */
export interface PpvSliderPostLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Pay-Per-View small slider post. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvSliderPost) */
export interface PpvSliderPostTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface PpvSliderPostCollection {
  __typename?: 'PpvSliderPostCollection';
  items: Array<Maybe<PpvSliderPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PpvSliderPostDescription {
  __typename?: 'PpvSliderPostDescription';
  json: Scalars['JSON'];
  links: PpvSliderPostDescriptionLinks;
}

export interface PpvSliderPostDescriptionAssets {
  __typename?: 'PpvSliderPostDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
}

export interface PpvSliderPostDescriptionEntries {
  __typename?: 'PpvSliderPostDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
}

export interface PpvSliderPostDescriptionLinks {
  __typename?: 'PpvSliderPostDescriptionLinks';
  assets: PpvSliderPostDescriptionAssets;
  entries: PpvSliderPostDescriptionEntries;
}

export interface PpvSliderPostFilter {
  AND?: Maybe<Array<Maybe<PpvSliderPostFilter>>>;
  OR?: Maybe<Array<Maybe<PpvSliderPostFilter>>>;
  callToActionLink?: Maybe<Scalars['String']>;
  callToActionLink_contains?: Maybe<Scalars['String']>;
  callToActionLink_exists?: Maybe<Scalars['Boolean']>;
  callToActionLink_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLink_not?: Maybe<Scalars['String']>;
  callToActionLink_not_contains?: Maybe<Scalars['String']>;
  callToActionLink_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  coverImage_exists?: Maybe<Scalars['Boolean']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_not_contains?: Maybe<Scalars['String']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface PpvSliderPostLinkingCollections {
  __typename?: 'PpvSliderPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PpvSliderPostLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum PpvSliderPostOrder {
  CallToActionLinkAsc = 'callToActionLink_ASC',
  CallToActionLinkDesc = 'callToActionLink_DESC',
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

/** Backgorund image for the PPV page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvWebsiteBackground) */
export interface PpvWebsiteBackground extends Entry {
  __typename?: 'PpvWebsiteBackground';
  backgroundImage?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<PpvWebsiteBackgroundLinkingCollections>;
  sys: Sys;
}

/** Backgorund image for the PPV page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvWebsiteBackground) */
export interface PpvWebsiteBackgroundBackgroundImageArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Backgorund image for the PPV page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/ppvWebsiteBackground) */
export interface PpvWebsiteBackgroundLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface PpvWebsiteBackgroundCollection {
  __typename?: 'PpvWebsiteBackgroundCollection';
  items: Array<Maybe<PpvWebsiteBackground>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface PpvWebsiteBackgroundFilter {
  AND?: Maybe<Array<Maybe<PpvWebsiteBackgroundFilter>>>;
  OR?: Maybe<Array<Maybe<PpvWebsiteBackgroundFilter>>>;
  backgroundImage_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
}

export interface PpvWebsiteBackgroundLinkingCollections {
  __typename?: 'PpvWebsiteBackgroundLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface PpvWebsiteBackgroundLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum PpvWebsiteBackgroundOrder {
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
  entryCollection?: Maybe<EntryCollection>;
  faqGroup?: Maybe<FaqGroup>;
  faqGroupCollection?: Maybe<FaqGroupCollection>;
  faqItem?: Maybe<FaqItem>;
  faqItemCollection?: Maybe<FaqItemCollection>;
  featurePost?: Maybe<FeaturePost>;
  featurePostCollection?: Maybe<FeaturePostCollection>;
  iconTile?: Maybe<IconTile>;
  iconTileCollection?: Maybe<IconTileCollection>;
  pageHome?: Maybe<PageHome>;
  pageHomeCollection?: Maybe<PageHomeCollection>;
  pageLearn?: Maybe<PageLearn>;
  pageLearnCollection?: Maybe<PageLearnCollection>;
  pageSectionBasicPosts?: Maybe<PageSectionBasicPosts>;
  pageSectionBasicPostsCollection?: Maybe<PageSectionBasicPostsCollection>;
  pageSectionFaQs?: Maybe<PageSectionFaQs>;
  pageSectionFaQsCollection?: Maybe<PageSectionFaQsCollection>;
  pageSectionFeaturePosts?: Maybe<PageSectionFeaturePosts>;
  pageSectionFeaturePostsCollection?: Maybe<PageSectionFeaturePostsCollection>;
  pageSectionIconTiles?: Maybe<PageSectionIconTiles>;
  pageSectionIconTilesCollection?: Maybe<PageSectionIconTilesCollection>;
  ppv?: Maybe<Ppv>;
  ppvCollection?: Maybe<PpvCollection>;
  ppvNftSliderPost?: Maybe<PpvNftSliderPost>;
  ppvNftSliderPostCollection?: Maybe<PpvNftSliderPostCollection>;
  ppvSliderPost?: Maybe<PpvSliderPost>;
  ppvSliderPostCollection?: Maybe<PpvSliderPostCollection>;
  ppvWebsiteBackground?: Maybe<PpvWebsiteBackground>;
  ppvWebsiteBackgroundCollection?: Maybe<PpvWebsiteBackgroundCollection>;
  teamMember?: Maybe<TeamMember>;
  teamMemberCollection?: Maybe<TeamMemberCollection>;
  tournament?: Maybe<Tournament>;
  tournamentCollection?: Maybe<TournamentCollection>;
  tournamentSeries?: Maybe<TournamentSeries>;
  tournamentSeriesCollection?: Maybe<TournamentSeriesCollection>;
  tournamentSeriesPrize?: Maybe<TournamentSeriesPrize>;
  tournamentSeriesPrizeCollection?: Maybe<TournamentSeriesPrizeCollection>;
  tournamentSeriesRegistrationItem?: Maybe<TournamentSeriesRegistrationItem>;
  tournamentSeriesRegistrationItemCollection?: Maybe<TournamentSeriesRegistrationItemCollection>;
}

export interface QueryAssetArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryAssetCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AssetFilter>;
}

export interface QueryBasicPostArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryBasicPostCategoryArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryBasicPostCategoryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<BasicPostCategoryOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<BasicPostCategoryFilter>;
}

export interface QueryBasicPostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<BasicPostOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<BasicPostFilter>;
}

export interface QueryEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<EntryOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<EntryFilter>;
}

export interface QueryFaqGroupArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryFaqGroupCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<FaqGroupOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FaqGroupFilter>;
}

export interface QueryFaqItemArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryFaqItemCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<FaqItemOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FaqItemFilter>;
}

export interface QueryFeaturePostArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryFeaturePostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<FeaturePostOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FeaturePostFilter>;
}

export interface QueryIconTileArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryIconTileCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<IconTileOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<IconTileFilter>;
}

export interface QueryPageHomeArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPageHomeCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PageHomeOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PageHomeFilter>;
}

export interface QueryPageLearnArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPageLearnCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PageLearnOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PageLearnFilter>;
}

export interface QueryPageSectionBasicPostsArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPageSectionBasicPostsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PageSectionBasicPostsOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PageSectionBasicPostsFilter>;
}

export interface QueryPageSectionFaQsArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPageSectionFaQsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PageSectionFaQsOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PageSectionFaQsFilter>;
}

export interface QueryPageSectionFeaturePostsArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPageSectionFeaturePostsCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PageSectionFeaturePostsOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PageSectionFeaturePostsFilter>;
}

export interface QueryPageSectionIconTilesArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPageSectionIconTilesCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PageSectionIconTilesOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PageSectionIconTilesFilter>;
}

export interface QueryPpvArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPpvCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PpvOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PpvFilter>;
}

export interface QueryPpvNftSliderPostArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPpvNftSliderPostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PpvNftSliderPostOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PpvNftSliderPostFilter>;
}

export interface QueryPpvSliderPostArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPpvSliderPostCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PpvSliderPostOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PpvSliderPostFilter>;
}

export interface QueryPpvWebsiteBackgroundArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryPpvWebsiteBackgroundCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<PpvWebsiteBackgroundOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PpvWebsiteBackgroundFilter>;
}

export interface QueryTeamMemberArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryTeamMemberCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<TeamMemberOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TeamMemberFilter>;
}

export interface QueryTournamentArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryTournamentCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<TournamentOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TournamentFilter>;
}

export interface QueryTournamentSeriesArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryTournamentSeriesCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<TournamentSeriesOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TournamentSeriesFilter>;
}

export interface QueryTournamentSeriesPrizeArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryTournamentSeriesPrizeCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<TournamentSeriesPrizeOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TournamentSeriesPrizeFilter>;
}

export interface QueryTournamentSeriesRegistrationItemArgs {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface QueryTournamentSeriesRegistrationItemCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<TournamentSeriesRegistrationItemOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TournamentSeriesRegistrationItemFilter>;
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
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  id?: Maybe<Scalars['String']>;
  id_contains?: Maybe<Scalars['String']>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt_gt?: Maybe<Scalars['DateTime']>;
  publishedAt_gte?: Maybe<Scalars['DateTime']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_lt?: Maybe<Scalars['DateTime']>;
  publishedAt_lte?: Maybe<Scalars['DateTime']>;
  publishedAt_not?: Maybe<Scalars['DateTime']>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedVersion?: Maybe<Scalars['Float']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion_gt?: Maybe<Scalars['Float']>;
  publishedVersion_gte?: Maybe<Scalars['Float']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_lt?: Maybe<Scalars['Float']>;
  publishedVersion_lte?: Maybe<Scalars['Float']>;
  publishedVersion_not?: Maybe<Scalars['Float']>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMember extends Entry {
  __typename?: 'TeamMember';
  avatar?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  github?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<TeamMemberLinkingCollections>;
  linkedin?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberAvatarArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberGithubArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberInstagramArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberLinkedinArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberNameArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** A team member of DeHub Team [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/teamMember) */
export interface TeamMemberTwitterArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface TeamMemberCollection {
  __typename?: 'TeamMemberCollection';
  items: Array<Maybe<TeamMember>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface TeamMemberFilter {
  AND?: Maybe<Array<Maybe<TeamMemberFilter>>>;
  OR?: Maybe<Array<Maybe<TeamMemberFilter>>>;
  avatar_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  github?: Maybe<Scalars['String']>;
  github_contains?: Maybe<Scalars['String']>;
  github_exists?: Maybe<Scalars['Boolean']>;
  github_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  github_not?: Maybe<Scalars['String']>;
  github_not_contains?: Maybe<Scalars['String']>;
  github_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  instagram?: Maybe<Scalars['String']>;
  instagram_contains?: Maybe<Scalars['String']>;
  instagram_exists?: Maybe<Scalars['Boolean']>;
  instagram_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  instagram_not?: Maybe<Scalars['String']>;
  instagram_not_contains?: Maybe<Scalars['String']>;
  instagram_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  linkedin?: Maybe<Scalars['String']>;
  linkedin_contains?: Maybe<Scalars['String']>;
  linkedin_exists?: Maybe<Scalars['Boolean']>;
  linkedin_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  linkedin_not?: Maybe<Scalars['String']>;
  linkedin_not_contains?: Maybe<Scalars['String']>;
  linkedin_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  twitter?: Maybe<Scalars['String']>;
  twitter_contains?: Maybe<Scalars['String']>;
  twitter_exists?: Maybe<Scalars['Boolean']>;
  twitter_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  twitter_not?: Maybe<Scalars['String']>;
  twitter_not_contains?: Maybe<Scalars['String']>;
  twitter_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface TeamMemberLinkingCollections {
  __typename?: 'TeamMemberLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface TeamMemberLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum TeamMemberOrder {
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

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface Tournament extends Entry {
  __typename?: 'Tournament';
  badge?: Maybe<Scalars['String']>;
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionButtonLink?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  coverImage?: Maybe<Asset>;
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<TournamentDescription>;
  featured?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<TournamentLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentBadgeArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentCallToActionButtonLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentCallToActionButtonLinkArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentCoverImageArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentDateArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentDescriptionArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentFeaturedArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Tournament information and meta [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournament) */
export interface TournamentTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface TournamentCollection {
  __typename?: 'TournamentCollection';
  items: Array<Maybe<Tournament>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface TournamentDescription {
  __typename?: 'TournamentDescription';
  json: Scalars['JSON'];
  links: TournamentDescriptionLinks;
}

export interface TournamentDescriptionAssets {
  __typename?: 'TournamentDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
}

export interface TournamentDescriptionEntries {
  __typename?: 'TournamentDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
}

export interface TournamentDescriptionLinks {
  __typename?: 'TournamentDescriptionLinks';
  assets: TournamentDescriptionAssets;
  entries: TournamentDescriptionEntries;
}

export interface TournamentFilter {
  AND?: Maybe<Array<Maybe<TournamentFilter>>>;
  OR?: Maybe<Array<Maybe<TournamentFilter>>>;
  badge?: Maybe<Scalars['String']>;
  badge_contains?: Maybe<Scalars['String']>;
  badge_exists?: Maybe<Scalars['Boolean']>;
  badge_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  badge_not?: Maybe<Scalars['String']>;
  badge_not_contains?: Maybe<Scalars['String']>;
  badge_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLabel?: Maybe<Scalars['String']>;
  callToActionButtonLabel_contains?: Maybe<Scalars['String']>;
  callToActionButtonLabel_exists?: Maybe<Scalars['Boolean']>;
  callToActionButtonLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLabel_not?: Maybe<Scalars['String']>;
  callToActionButtonLabel_not_contains?: Maybe<Scalars['String']>;
  callToActionButtonLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLink?: Maybe<Scalars['String']>;
  callToActionButtonLink_contains?: Maybe<Scalars['String']>;
  callToActionButtonLink_exists?: Maybe<Scalars['Boolean']>;
  callToActionButtonLink_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLink_not?: Maybe<Scalars['String']>;
  callToActionButtonLink_not_contains?: Maybe<Scalars['String']>;
  callToActionButtonLink_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  coverImage_exists?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['DateTime']>;
  date_exists?: Maybe<Scalars['Boolean']>;
  date_gt?: Maybe<Scalars['DateTime']>;
  date_gte?: Maybe<Scalars['DateTime']>;
  date_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  date_lt?: Maybe<Scalars['DateTime']>;
  date_lte?: Maybe<Scalars['DateTime']>;
  date_not?: Maybe<Scalars['DateTime']>;
  date_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_not_contains?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  featured_exists?: Maybe<Scalars['Boolean']>;
  featured_not?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface TournamentLinkingCollections {
  __typename?: 'TournamentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface TournamentLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum TournamentOrder {
  BadgeAsc = 'badge_ASC',
  BadgeDesc = 'badge_DESC',
  CallToActionButtonLabelAsc = 'callToActionButtonLabel_ASC',
  CallToActionButtonLabelDesc = 'callToActionButtonLabel_DESC',
  CallToActionButtonLinkAsc = 'callToActionButtonLink_ASC',
  CallToActionButtonLinkDesc = 'callToActionButtonLink_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  FeaturedAsc = 'featured_ASC',
  FeaturedDesc = 'featured_DESC',
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

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeries extends Entry {
  __typename?: 'TournamentSeries';
  backgroundImage?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  dateLabel?: Maybe<Scalars['String']>;
  disclaimerLabel?: Maybe<Scalars['String']>;
  featuringLogo?: Maybe<Asset>;
  linkedFrom?: Maybe<TournamentSeriesLinkingCollections>;
  poweredLabel?: Maybe<Scalars['String']>;
  prizePoolCollection?: Maybe<TournamentSeriesPrizePoolCollection>;
  seriesLogo?: Maybe<Asset>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesBackgroundImageArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesDateLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesDisclaimerLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesFeaturingLogoArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesPoweredLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesPrizePoolCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesSeriesLogoArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

/** Tournament series page. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeries) */
export interface TournamentSeriesTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface TournamentSeriesCollection {
  __typename?: 'TournamentSeriesCollection';
  items: Array<Maybe<TournamentSeries>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface TournamentSeriesFilter {
  AND?: Maybe<Array<Maybe<TournamentSeriesFilter>>>;
  OR?: Maybe<Array<Maybe<TournamentSeriesFilter>>>;
  backgroundImage_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  dateLabel?: Maybe<Scalars['String']>;
  dateLabel_contains?: Maybe<Scalars['String']>;
  dateLabel_exists?: Maybe<Scalars['Boolean']>;
  dateLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  dateLabel_not?: Maybe<Scalars['String']>;
  dateLabel_not_contains?: Maybe<Scalars['String']>;
  dateLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  disclaimerLabel?: Maybe<Scalars['String']>;
  disclaimerLabel_contains?: Maybe<Scalars['String']>;
  disclaimerLabel_exists?: Maybe<Scalars['Boolean']>;
  disclaimerLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  disclaimerLabel_not?: Maybe<Scalars['String']>;
  disclaimerLabel_not_contains?: Maybe<Scalars['String']>;
  disclaimerLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  featuringLogo_exists?: Maybe<Scalars['Boolean']>;
  poweredLabel?: Maybe<Scalars['String']>;
  poweredLabel_contains?: Maybe<Scalars['String']>;
  poweredLabel_exists?: Maybe<Scalars['Boolean']>;
  poweredLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  poweredLabel_not?: Maybe<Scalars['String']>;
  poweredLabel_not_contains?: Maybe<Scalars['String']>;
  poweredLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  prizePoolCollection_exists?: Maybe<Scalars['Boolean']>;
  seriesLogo_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface TournamentSeriesLinkingCollections {
  __typename?: 'TournamentSeriesLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  tournamentSeriesRegistrationItemCollection?: Maybe<TournamentSeriesRegistrationItemCollection>;
}

export interface TournamentSeriesLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface TournamentSeriesLinkingCollectionsTournamentSeriesRegistrationItemCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum TournamentSeriesOrder {
  DateLabelAsc = 'dateLabel_ASC',
  DateLabelDesc = 'dateLabel_DESC',
  DisclaimerLabelAsc = 'disclaimerLabel_ASC',
  DisclaimerLabelDesc = 'disclaimerLabel_DESC',
  PoweredLabelAsc = 'poweredLabel_ASC',
  PoweredLabelDesc = 'poweredLabel_DESC',
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

/** Holds information about the monetary prize for a specific winning place. Can be reused on multiple Tournament Series pages. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesPrize) */
export interface TournamentSeriesPrize extends Entry {
  __typename?: 'TournamentSeriesPrize';
  contentfulMetadata: ContentfulMetadata;
  currency?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<TournamentSeriesPrizeLinkingCollections>;
  monetaryValue?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  winningPlace?: Maybe<Scalars['Int']>;
}

/** Holds information about the monetary prize for a specific winning place. Can be reused on multiple Tournament Series pages. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesPrize) */
export interface TournamentSeriesPrizeCurrencyArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Holds information about the monetary prize for a specific winning place. Can be reused on multiple Tournament Series pages. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesPrize) */
export interface TournamentSeriesPrizeLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Holds information about the monetary prize for a specific winning place. Can be reused on multiple Tournament Series pages. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesPrize) */
export interface TournamentSeriesPrizeMonetaryValueArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Holds information about the monetary prize for a specific winning place. Can be reused on multiple Tournament Series pages. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesPrize) */
export interface TournamentSeriesPrizeTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** Holds information about the monetary prize for a specific winning place. Can be reused on multiple Tournament Series pages. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesPrize) */
export interface TournamentSeriesPrizeWinningPlaceArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface TournamentSeriesPrizeCollection {
  __typename?: 'TournamentSeriesPrizeCollection';
  items: Array<Maybe<TournamentSeriesPrize>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface TournamentSeriesPrizeFilter {
  AND?: Maybe<Array<Maybe<TournamentSeriesPrizeFilter>>>;
  OR?: Maybe<Array<Maybe<TournamentSeriesPrizeFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  currency?: Maybe<Scalars['String']>;
  currency_contains?: Maybe<Scalars['String']>;
  currency_exists?: Maybe<Scalars['Boolean']>;
  currency_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  currency_not?: Maybe<Scalars['String']>;
  currency_not_contains?: Maybe<Scalars['String']>;
  currency_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  monetaryValue?: Maybe<Scalars['Int']>;
  monetaryValue_exists?: Maybe<Scalars['Boolean']>;
  monetaryValue_gt?: Maybe<Scalars['Int']>;
  monetaryValue_gte?: Maybe<Scalars['Int']>;
  monetaryValue_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  monetaryValue_lt?: Maybe<Scalars['Int']>;
  monetaryValue_lte?: Maybe<Scalars['Int']>;
  monetaryValue_not?: Maybe<Scalars['Int']>;
  monetaryValue_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  winningPlace?: Maybe<Scalars['Int']>;
  winningPlace_exists?: Maybe<Scalars['Boolean']>;
  winningPlace_gt?: Maybe<Scalars['Int']>;
  winningPlace_gte?: Maybe<Scalars['Int']>;
  winningPlace_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  winningPlace_lt?: Maybe<Scalars['Int']>;
  winningPlace_lte?: Maybe<Scalars['Int']>;
  winningPlace_not?: Maybe<Scalars['Int']>;
  winningPlace_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
}

export interface TournamentSeriesPrizeLinkingCollections {
  __typename?: 'TournamentSeriesPrizeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  tournamentSeriesCollection?: Maybe<TournamentSeriesCollection>;
}

export interface TournamentSeriesPrizeLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export interface TournamentSeriesPrizeLinkingCollectionsTournamentSeriesCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum TournamentSeriesPrizeOrder {
  CurrencyAsc = 'currency_ASC',
  CurrencyDesc = 'currency_DESC',
  MonetaryValueAsc = 'monetaryValue_ASC',
  MonetaryValueDesc = 'monetaryValue_DESC',
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
  WinningPlaceAsc = 'winningPlace_ASC',
  WinningPlaceDesc = 'winningPlace_DESC',
}

export interface TournamentSeriesPrizePoolCollection {
  __typename?: 'TournamentSeriesPrizePoolCollection';
  items: Array<Maybe<TournamentSeriesPrize>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItem extends Entry {
  __typename?: 'TournamentSeriesRegistrationItem';
  buttonLabel?: Maybe<Scalars['String']>;
  buttonLink?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  dateAndTime?: Maybe<Scalars['DateTime']>;
  linkedFrom?: Maybe<TournamentSeriesRegistrationItemLinkingCollections>;
  privateTitle?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  tournamentSeries?: Maybe<TournamentSeries>;
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItemButtonLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItemButtonLinkArgs {
  locale?: Maybe<Scalars['String']>;
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItemDateAndTimeArgs {
  locale?: Maybe<Scalars['String']>;
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItemLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItemPrivateTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItemTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** The Registration Item holds information and the link to the registration to the series. Create at least one item for each series page. A tournament series page can hold up to two registration items. [See type definition](https://app.contentful.com/spaces/4jicnfvodfm8/content_types/tournamentSeriesRegistrationItem) */
export interface TournamentSeriesRegistrationItemTournamentSeriesArgs {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
}

export interface TournamentSeriesRegistrationItemCollection {
  __typename?: 'TournamentSeriesRegistrationItemCollection';
  items: Array<Maybe<TournamentSeriesRegistrationItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
}

export interface TournamentSeriesRegistrationItemFilter {
  AND?: Maybe<Array<Maybe<TournamentSeriesRegistrationItemFilter>>>;
  OR?: Maybe<Array<Maybe<TournamentSeriesRegistrationItemFilter>>>;
  buttonLabel?: Maybe<Scalars['String']>;
  buttonLabel_contains?: Maybe<Scalars['String']>;
  buttonLabel_exists?: Maybe<Scalars['Boolean']>;
  buttonLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  buttonLabel_not?: Maybe<Scalars['String']>;
  buttonLabel_not_contains?: Maybe<Scalars['String']>;
  buttonLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  buttonLink?: Maybe<Scalars['String']>;
  buttonLink_contains?: Maybe<Scalars['String']>;
  buttonLink_exists?: Maybe<Scalars['Boolean']>;
  buttonLink_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  buttonLink_not?: Maybe<Scalars['String']>;
  buttonLink_not_contains?: Maybe<Scalars['String']>;
  buttonLink_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  dateAndTime?: Maybe<Scalars['DateTime']>;
  dateAndTime_exists?: Maybe<Scalars['Boolean']>;
  dateAndTime_gt?: Maybe<Scalars['DateTime']>;
  dateAndTime_gte?: Maybe<Scalars['DateTime']>;
  dateAndTime_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  dateAndTime_lt?: Maybe<Scalars['DateTime']>;
  dateAndTime_lte?: Maybe<Scalars['DateTime']>;
  dateAndTime_not?: Maybe<Scalars['DateTime']>;
  dateAndTime_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  privateTitle?: Maybe<Scalars['String']>;
  privateTitle_contains?: Maybe<Scalars['String']>;
  privateTitle_exists?: Maybe<Scalars['Boolean']>;
  privateTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  privateTitle_not?: Maybe<Scalars['String']>;
  privateTitle_not_contains?: Maybe<Scalars['String']>;
  privateTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  tournamentSeries?: Maybe<CfTournamentSeriesNestedFilter>;
  tournamentSeries_exists?: Maybe<Scalars['Boolean']>;
}

export interface TournamentSeriesRegistrationItemLinkingCollections {
  __typename?: 'TournamentSeriesRegistrationItemLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface TournamentSeriesRegistrationItemLinkingCollectionsEntryCollectionArgs {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
}

export enum TournamentSeriesRegistrationItemOrder {
  ButtonLabelAsc = 'buttonLabel_ASC',
  ButtonLabelDesc = 'buttonLabel_DESC',
  ButtonLinkAsc = 'buttonLink_ASC',
  ButtonLinkDesc = 'buttonLink_DESC',
  DateAndTimeAsc = 'dateAndTime_ASC',
  DateAndTimeDesc = 'dateAndTime_DESC',
  PrivateTitleAsc = 'privateTitle_ASC',
  PrivateTitleDesc = 'privateTitle_DESC',
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
  AND?: Maybe<Array<Maybe<CfBasicPostCategoryNestedFilter>>>;
  OR?: Maybe<Array<Maybe<CfBasicPostCategoryNestedFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
}

export interface CfTournamentSeriesNestedFilter {
  AND?: Maybe<Array<Maybe<CfTournamentSeriesNestedFilter>>>;
  OR?: Maybe<Array<Maybe<CfTournamentSeriesNestedFilter>>>;
  backgroundImage_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  dateLabel?: Maybe<Scalars['String']>;
  dateLabel_contains?: Maybe<Scalars['String']>;
  dateLabel_exists?: Maybe<Scalars['Boolean']>;
  dateLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  dateLabel_not?: Maybe<Scalars['String']>;
  dateLabel_not_contains?: Maybe<Scalars['String']>;
  dateLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  disclaimerLabel?: Maybe<Scalars['String']>;
  disclaimerLabel_contains?: Maybe<Scalars['String']>;
  disclaimerLabel_exists?: Maybe<Scalars['Boolean']>;
  disclaimerLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  disclaimerLabel_not?: Maybe<Scalars['String']>;
  disclaimerLabel_not_contains?: Maybe<Scalars['String']>;
  disclaimerLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  featuringLogo_exists?: Maybe<Scalars['Boolean']>;
  poweredLabel?: Maybe<Scalars['String']>;
  poweredLabel_contains?: Maybe<Scalars['String']>;
  poweredLabel_exists?: Maybe<Scalars['Boolean']>;
  poweredLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  poweredLabel_not?: Maybe<Scalars['String']>;
  poweredLabel_not_contains?: Maybe<Scalars['String']>;
  poweredLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  prizePoolCollection_exists?: Maybe<Scalars['Boolean']>;
  seriesLogo_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export type SysFragment = {
  __typename?: 'Sys';
  publishedAt?: any | null | undefined;
};

export type TeamMembersQueryVariables = Exact<{
  isPreview?: Maybe<Scalars['Boolean']>;
}>;

export type TeamMembersQuery = {
  __typename?: 'Query';
  teamMemberCollection?:
    | {
        __typename?: 'TeamMemberCollection';
        items: Array<
          | {
              __typename?: 'TeamMember';
              name?: string | null | undefined;
              title?: string | null | undefined;
              twitter?: string | null | undefined;
              linkedin?: string | null | undefined;
              instagram?: string | null | undefined;
              github?: string | null | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | null | undefined };
              avatar?:
                | { __typename?: 'Asset'; url?: string | null | undefined }
                | null
                | undefined;
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined;
};

export type TournamentFragment = {
  __typename?: 'Tournament';
  title?: string | null | undefined;
  date?: any | null | undefined;
  badge?: string | null | undefined;
  callToActionButtonLabel?: string | null | undefined;
  callToActionButtonLink?: string | null | undefined;
  featured?: boolean | null | undefined;
  sys: { __typename?: 'Sys'; publishedAt?: any | null | undefined };
  coverImage?:
    | { __typename?: 'Asset'; url?: string | null | undefined }
    | null
    | undefined;
  description?:
    | { __typename?: 'TournamentDescription'; json: any }
    | null
    | undefined;
};

export type TournamentCollectionFragment = {
  __typename?: 'TournamentCollection';
  total: number;
  items: Array<
    | {
        __typename?: 'Tournament';
        title?: string | null | undefined;
        date?: any | null | undefined;
        badge?: string | null | undefined;
        callToActionButtonLabel?: string | null | undefined;
        callToActionButtonLink?: string | null | undefined;
        featured?: boolean | null | undefined;
        sys: { __typename?: 'Sys'; publishedAt?: any | null | undefined };
        coverImage?:
          | { __typename?: 'Asset'; url?: string | null | undefined }
          | null
          | undefined;
        description?:
          | { __typename?: 'TournamentDescription'; json: any }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type TournamentsQueryVariables = Exact<{
  isFeatured?: Maybe<Scalars['Boolean']>;
  dateGte?: Maybe<Scalars['DateTime']>;
  isPreview?: Maybe<Scalars['Boolean']>;
}>;

export type TournamentsQuery = {
  __typename?: 'Query';
  tournamentCollection?:
    | {
        __typename?: 'TournamentCollection';
        total: number;
        items: Array<
          | {
              __typename?: 'Tournament';
              title?: string | null | undefined;
              date?: any | null | undefined;
              badge?: string | null | undefined;
              callToActionButtonLabel?: string | null | undefined;
              callToActionButtonLink?: string | null | undefined;
              featured?: boolean | null | undefined;
              sys: { __typename?: 'Sys'; publishedAt?: any | null | undefined };
              coverImage?:
                | { __typename?: 'Asset'; url?: string | null | undefined }
                | null
                | undefined;
              description?:
                | { __typename?: 'TournamentDescription'; json: any }
                | null
                | undefined;
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined;
};

export const SysFragmentDoc = gql`
  fragment Sys on Sys {
    publishedAt
  }
`;
export const TournamentFragmentDoc = gql`
  fragment Tournament on Tournament {
    sys {
      ...Sys
    }
    coverImage {
      url
    }
    title
    date
    badge
    callToActionButtonLabel
    callToActionButtonLink
    featured
    description {
      json
    }
  }
  ${SysFragmentDoc}
`;
export const TournamentCollectionFragmentDoc = gql`
  fragment TournamentCollection on TournamentCollection {
    total
    items {
      ...Tournament
    }
  }
  ${TournamentFragmentDoc}
`;
export const TeamMembersDocument = gql`
  query teamMembers($isPreview: Boolean = false) {
    teamMemberCollection(preview: $isPreview) {
      items {
        sys {
          ...Sys
        }
        name
        title
        avatar {
          url
        }
        twitter
        linkedin
        instagram
        github
      }
    }
  }
  ${SysFragmentDoc}
`;
export const TournamentsDocument = gql`
  query tournaments(
    $isFeatured: Boolean
    $dateGte: DateTime
    $isPreview: Boolean = false
  ) {
    tournamentCollection(
      where: { featured: $isFeatured, date_gte: $dateGte }
      order: [date_DESC]
      preview: $isPreview
    ) {
      ...TournamentCollection
    }
  }
  ${TournamentCollectionFragmentDoc}
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
    teamMembers(
      variables?: TeamMembersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TeamMembersQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<TeamMembersQuery>(TeamMembersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'teamMembers'
      );
    },
    tournaments(
      variables?: TournamentsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TournamentsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<TournamentsQuery>(TournamentsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'tournaments'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
