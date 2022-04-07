/* eslint-disable */
import * as models from '@dehub/shared/model';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
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
    handpickedPostsCollection(limit: 5, preview: $isPreview) {
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
    handpickedPostsCollection(limit: 5, preview: $isPreview) {
      items {
        ...GrandPost
      }
    }
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

/**
 * __useBasicPostCollectionBySlugQuery__
 *
 * To run a query within a React component, call `useBasicPostCollectionBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBasicPostCollectionBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBasicPostCollectionBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function useBasicPostCollectionBySlugQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.BasicPostCollectionBySlugQuery,
    models.BasicPostCollectionBySlugQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.BasicPostCollectionBySlugQuery,
    models.BasicPostCollectionBySlugQueryVariables
  >(BasicPostCollectionBySlugDocument, options);
}
export function useBasicPostCollectionBySlugLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.BasicPostCollectionBySlugQuery,
    models.BasicPostCollectionBySlugQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.BasicPostCollectionBySlugQuery,
    models.BasicPostCollectionBySlugQueryVariables
  >(BasicPostCollectionBySlugDocument, options);
}
export type BasicPostCollectionBySlugQueryHookResult = ReturnType<
  typeof useBasicPostCollectionBySlugQuery
>;
export type BasicPostCollectionBySlugLazyQueryHookResult = ReturnType<
  typeof useBasicPostCollectionBySlugLazyQuery
>;
export type BasicPostCollectionBySlugQueryResult = Apollo.QueryResult<
  models.BasicPostCollectionBySlugQuery,
  models.BasicPostCollectionBySlugQueryVariables
>;
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

/**
 * __useLegalPostCollectionBySlugQuery__
 *
 * To run a query within a React component, call `useLegalPostCollectionBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useLegalPostCollectionBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLegalPostCollectionBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function useLegalPostCollectionBySlugQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.LegalPostCollectionBySlugQuery,
    models.LegalPostCollectionBySlugQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.LegalPostCollectionBySlugQuery,
    models.LegalPostCollectionBySlugQueryVariables
  >(LegalPostCollectionBySlugDocument, options);
}
export function useLegalPostCollectionBySlugLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.LegalPostCollectionBySlugQuery,
    models.LegalPostCollectionBySlugQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.LegalPostCollectionBySlugQuery,
    models.LegalPostCollectionBySlugQueryVariables
  >(LegalPostCollectionBySlugDocument, options);
}
export type LegalPostCollectionBySlugQueryHookResult = ReturnType<
  typeof useLegalPostCollectionBySlugQuery
>;
export type LegalPostCollectionBySlugLazyQueryHookResult = ReturnType<
  typeof useLegalPostCollectionBySlugLazyQuery
>;
export type LegalPostCollectionBySlugQueryResult = Apollo.QueryResult<
  models.LegalPostCollectionBySlugQuery,
  models.LegalPostCollectionBySlugQueryVariables
>;
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

/**
 * __usePageAccessWallCollectionQuery__
 *
 * To run a query within a React component, call `usePageAccessWallCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageAccessWallCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageAccessWallCollectionQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function usePageAccessWallCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.PageAccessWallCollectionQuery,
    models.PageAccessWallCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.PageAccessWallCollectionQuery,
    models.PageAccessWallCollectionQueryVariables
  >(PageAccessWallCollectionDocument, options);
}
export function usePageAccessWallCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.PageAccessWallCollectionQuery,
    models.PageAccessWallCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.PageAccessWallCollectionQuery,
    models.PageAccessWallCollectionQueryVariables
  >(PageAccessWallCollectionDocument, options);
}
export type PageAccessWallCollectionQueryHookResult = ReturnType<
  typeof usePageAccessWallCollectionQuery
>;
export type PageAccessWallCollectionLazyQueryHookResult = ReturnType<
  typeof usePageAccessWallCollectionLazyQuery
>;
export type PageAccessWallCollectionQueryResult = Apollo.QueryResult<
  models.PageAccessWallCollectionQuery,
  models.PageAccessWallCollectionQueryVariables
>;
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

/**
 * __usePageEarnCollectionQuery__
 *
 * To run a query within a React component, call `usePageEarnCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageEarnCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageEarnCollectionQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function usePageEarnCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.PageEarnCollectionQuery,
    models.PageEarnCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.PageEarnCollectionQuery,
    models.PageEarnCollectionQueryVariables
  >(PageEarnCollectionDocument, options);
}
export function usePageEarnCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.PageEarnCollectionQuery,
    models.PageEarnCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.PageEarnCollectionQuery,
    models.PageEarnCollectionQueryVariables
  >(PageEarnCollectionDocument, options);
}
export type PageEarnCollectionQueryHookResult = ReturnType<
  typeof usePageEarnCollectionQuery
>;
export type PageEarnCollectionLazyQueryHookResult = ReturnType<
  typeof usePageEarnCollectionLazyQuery
>;
export type PageEarnCollectionQueryResult = Apollo.QueryResult<
  models.PageEarnCollectionQuery,
  models.PageEarnCollectionQueryVariables
>;
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

/**
 * __usePageGameCollectionQuery__
 *
 * To run a query within a React component, call `usePageGameCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageGameCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageGameCollectionQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function usePageGameCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.PageGameCollectionQuery,
    models.PageGameCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.PageGameCollectionQuery,
    models.PageGameCollectionQueryVariables
  >(PageGameCollectionDocument, options);
}
export function usePageGameCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.PageGameCollectionQuery,
    models.PageGameCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.PageGameCollectionQuery,
    models.PageGameCollectionQueryVariables
  >(PageGameCollectionDocument, options);
}
export type PageGameCollectionQueryHookResult = ReturnType<
  typeof usePageGameCollectionQuery
>;
export type PageGameCollectionLazyQueryHookResult = ReturnType<
  typeof usePageGameCollectionLazyQuery
>;
export type PageGameCollectionQueryResult = Apollo.QueryResult<
  models.PageGameCollectionQuery,
  models.PageGameCollectionQueryVariables
>;
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

/**
 * __usePageHomeCollectionQuery__
 *
 * To run a query within a React component, call `usePageHomeCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageHomeCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageHomeCollectionQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function usePageHomeCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.PageHomeCollectionQuery,
    models.PageHomeCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.PageHomeCollectionQuery,
    models.PageHomeCollectionQueryVariables
  >(PageHomeCollectionDocument, options);
}
export function usePageHomeCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.PageHomeCollectionQuery,
    models.PageHomeCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.PageHomeCollectionQuery,
    models.PageHomeCollectionQueryVariables
  >(PageHomeCollectionDocument, options);
}
export type PageHomeCollectionQueryHookResult = ReturnType<
  typeof usePageHomeCollectionQuery
>;
export type PageHomeCollectionLazyQueryHookResult = ReturnType<
  typeof usePageHomeCollectionLazyQuery
>;
export type PageHomeCollectionQueryResult = Apollo.QueryResult<
  models.PageHomeCollectionQuery,
  models.PageHomeCollectionQueryVariables
>;
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

/**
 * __usePageLearnCollectionQuery__
 *
 * To run a query within a React component, call `usePageLearnCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageLearnCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageLearnCollectionQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function usePageLearnCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.PageLearnCollectionQuery,
    models.PageLearnCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.PageLearnCollectionQuery,
    models.PageLearnCollectionQueryVariables
  >(PageLearnCollectionDocument, options);
}
export function usePageLearnCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.PageLearnCollectionQuery,
    models.PageLearnCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.PageLearnCollectionQuery,
    models.PageLearnCollectionQueryVariables
  >(PageLearnCollectionDocument, options);
}
export type PageLearnCollectionQueryHookResult = ReturnType<
  typeof usePageLearnCollectionQuery
>;
export type PageLearnCollectionLazyQueryHookResult = ReturnType<
  typeof usePageLearnCollectionLazyQuery
>;
export type PageLearnCollectionQueryResult = Apollo.QueryResult<
  models.PageLearnCollectionQuery,
  models.PageLearnCollectionQueryVariables
>;
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

/**
 * __usePageStreamCollectionQuery__
 *
 * To run a query within a React component, call `usePageStreamCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageStreamCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageStreamCollectionQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function usePageStreamCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.PageStreamCollectionQuery,
    models.PageStreamCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.PageStreamCollectionQuery,
    models.PageStreamCollectionQueryVariables
  >(PageStreamCollectionDocument, options);
}
export function usePageStreamCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.PageStreamCollectionQuery,
    models.PageStreamCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.PageStreamCollectionQuery,
    models.PageStreamCollectionQueryVariables
  >(PageStreamCollectionDocument, options);
}
export type PageStreamCollectionQueryHookResult = ReturnType<
  typeof usePageStreamCollectionQuery
>;
export type PageStreamCollectionLazyQueryHookResult = ReturnType<
  typeof usePageStreamCollectionLazyQuery
>;
export type PageStreamCollectionQueryResult = Apollo.QueryResult<
  models.PageStreamCollectionQuery,
  models.PageStreamCollectionQueryVariables
>;
