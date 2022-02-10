import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
import * as models from '@dehub/shared/models';
const defaultOptions = {};
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
