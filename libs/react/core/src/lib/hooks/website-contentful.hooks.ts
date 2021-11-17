/* eslint-disable */
import * as models from '@dehub/shared/models';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};

export const TeamMembersDocument = gql`
  query teamMembers($isPreview: Boolean = false) {
    teamMemberCollection(preview: $isPreview) {
      items {
        sys {
          id
          publishedAt
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
