/* eslint-disable */
import * as models from '@dehub/shared/model';
import * as Operations from '@dehub/shared/model';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { GraphQLModule } from '../graphql.module';

@Injectable({
  providedIn: GraphQLModule,
})
export class PageHomeCollectionService extends Apollo.Query<
  models.PageHomeCollectionQuery,
  models.PageHomeCollectionQueryVariables
> {
  document = models.PageHomeCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class TeamMembersService extends Apollo.Query<
  models.TeamMembersQuery,
  models.TeamMembersQueryVariables
> {
  document = models.TeamMembersDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class TournamentsService extends Apollo.Query<
  models.TournamentsQuery,
  models.TournamentsQueryVariables
> {
  document = models.TournamentsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
