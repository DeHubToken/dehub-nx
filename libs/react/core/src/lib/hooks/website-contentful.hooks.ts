/* eslint-disable */
import * as models from '@dehub/shared/model';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export const SysFragmentDoc = gql`
  fragment Sys on Sys {
    publishedAt
  }
`;
export const BasicPostFragmentDoc = gql`
  fragment BasicPost on BasicPost {
    sys {
      ...Sys
    }
    title
    mainPicture {
      title
      url
    }
    summary
    slug
  }
  ${SysFragmentDoc}
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
export const PageHomeFragmentDoc = gql`
  fragment PageHome on PageHome {
    sys {
      id
    }
    mainTitle
    subtitle
    sectionsCollection(limit: 10, preview: $isPreview) {
      total
      items {
        kind: __typename
        ... on PageSectionBasicPosts {
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
        kind: __typename
        ... on PageSectionIconTiles {
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
        kind: __typename
        ... on PageSectionFaQs {
          sys {
            ...Sys
          }
          title
          handpickedFaqGroupsCollection(limit: 5, preview: $isPreview) {
            items {
              faqItemCollection(limit: 50, preview: $isPreview) {
                items {
                  ...FaqItem
                }
              }
            }
          }
        }
      }
    }
  }
  ${SysFragmentDoc}
  ${BasicPostFragmentDoc}
  ${IconTileFragmentDoc}
  ${FaqItemFragmentDoc}
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
