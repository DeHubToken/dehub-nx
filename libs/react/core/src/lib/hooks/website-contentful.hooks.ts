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
    handpickedPostsCollection(limit: 5, preview: $isPreview) {
      items {
        ...FeaturePost
      }
    }
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
    handpickedPostsCollection(limit: 20, preview: $isPreview) {
      items {
        ...ThumbnailPost
      }
    }
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
    handpickedIconTilesCollection(limit: 5, preview: $isPreview) {
      items {
        ...IconTile
      }
    }
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
    handpickedFaqGroupsCollection(limit: 5, preview: $isPreview) {
      items {
        ...FaqGroup
      }
    }
  }
  ${SysFragmentDoc}
  ${FaqGroupFragmentDoc}
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
    subtitle
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
`;
export const PageHomeFragmentDoc = gql`
  fragment PageHome on PageHome {
    sys {
      ...Sys
    }
    mainTitle
    subtitle
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
`;
export const PageLearnFragmentDoc = gql`
  fragment PageLearn on PageLearn {
    sys {
      ...Sys
    }
    mainTitle
    subtitle
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
`;
export const PageStreamFragmentDoc = gql`
  fragment PageStream on PageStream {
    sys {
      ...Sys
    }
    mainTitle
    subtitle
    sectionsCollection(limit: 10, preview: $isPreview) {
      items {
        ...PageSectionFeaturePosts
        ...PageSectionThumbnailPosts
        ...PageSectionBasicPosts
        ...PageSectionIconTiles
        ...PageSectionFaQs
        ...PageSectionDappPosts
      }
    }
  }
  ${SysFragmentDoc}
  ${PageSectionFeaturePostsFragmentDoc}
  ${PageSectionThumbnailPostsFragmentDoc}
  ${PageSectionBasicPostsFragmentDoc}
  ${PageSectionIconTilesFragmentDoc}
  ${PageSectionFaQsFragmentDoc}
  ${PageSectionDappPostsFragmentDoc}
`;
export const TournamentFragmentDoc = gql`
  fragment Tournament on Tournament {
    sys {
      ...Sys
    }
    coverImage(preview: $isPreview) {
      sys {
        ...Sys
      }
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
export const TeamMembersDocument = gql`
  query teamMembers($isPreview: Boolean = false) {
    teamMemberCollection(preview: $isPreview) {
      items {
        sys {
          ...Sys
        }
        name
        title
        avatar(preview: $isPreview) {
          sys {
            ...Sys
          }
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

/**
 * __useTeamMembersQuery__
 *
 * To run a query within a React component, call `useTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamMembersQuery({
 *   variables: {
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function useTeamMembersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.TeamMembersQuery,
    models.TeamMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.TeamMembersQuery,
    models.TeamMembersQueryVariables
  >(TeamMembersDocument, options);
}
export function useTeamMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.TeamMembersQuery,
    models.TeamMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.TeamMembersQuery,
    models.TeamMembersQueryVariables
  >(TeamMembersDocument, options);
}
export type TeamMembersQueryHookResult = ReturnType<typeof useTeamMembersQuery>;
export type TeamMembersLazyQueryHookResult = ReturnType<
  typeof useTeamMembersLazyQuery
>;
export type TeamMembersQueryResult = Apollo.QueryResult<
  models.TeamMembersQuery,
  models.TeamMembersQueryVariables
>;
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

/**
 * __useTournamentsQuery__
 *
 * To run a query within a React component, call `useTournamentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentsQuery({
 *   variables: {
 *      isFeatured: // value for 'isFeatured'
 *      dateGte: // value for 'dateGte'
 *      isPreview: // value for 'isPreview'
 *   },
 * });
 */
export function useTournamentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    models.TournamentsQuery,
    models.TournamentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    models.TournamentsQuery,
    models.TournamentsQueryVariables
  >(TournamentsDocument, options);
}
export function useTournamentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    models.TournamentsQuery,
    models.TournamentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    models.TournamentsQuery,
    models.TournamentsQueryVariables
  >(TournamentsDocument, options);
}
export type TournamentsQueryHookResult = ReturnType<typeof useTournamentsQuery>;
export type TournamentsLazyQueryHookResult = ReturnType<
  typeof useTournamentsLazyQuery
>;
export type TournamentsQueryResult = Apollo.QueryResult<
  models.TournamentsQuery,
  models.TournamentsQueryVariables
>;
