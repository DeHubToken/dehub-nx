import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';

/**
 * ISSUE: workaround for https://github.com/kamilkisiela/apollo-angular/issues/1703
 *
 * has to be called in `test-setup.ts`:
 *
 * ```
 * import { Apollo, ApolloBase } from 'apollo-angular';
 * import { fixApolloBase } from './workaround';
 * fixApolloBase(Apollo, ApolloBase);
 *
 * ```
 *
 * @param _apollo `Apollo` has to be imported by the caller (forces the called to do so)
 * @param apolloBase `ApolloBase` has to be imported by the caller (forces the called to do so)
 * @returns
 */
export function fixApolloBase(
  _apollo: typeof Apollo,
  apolloBase: typeof ApolloBase
) {
  return Injectable()(apolloBase);
}
