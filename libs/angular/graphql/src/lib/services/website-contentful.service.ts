/* eslint-disable */
import * as models from '@dehub/shared/model';
import * as Operations from '@dehub/shared/model';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { GraphQLModule } from '../graphql.module';

@Injectable({
  providedIn: GraphQLModule,
})
export class BasicPostCollectionBySlugService extends Apollo.Query<
  models.BasicPostCollectionBySlugQuery,
  models.BasicPostCollectionBySlugQueryVariables
> {
  document = models.BasicPostCollectionBySlugDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class FooterCollectionService extends Apollo.Query<
  models.FooterCollectionQuery,
  models.FooterCollectionQueryVariables
> {
  document = models.FooterCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class LegalPostCollectionBySlugService extends Apollo.Query<
  models.LegalPostCollectionBySlugQuery,
  models.LegalPostCollectionBySlugQueryVariables
> {
  document = models.LegalPostCollectionBySlugDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class PageAccessWallCollectionService extends Apollo.Query<
  models.PageAccessWallCollectionQuery,
  models.PageAccessWallCollectionQueryVariables
> {
  document = models.PageAccessWallCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class PageEarnCollectionService extends Apollo.Query<
  models.PageEarnCollectionQuery,
  models.PageEarnCollectionQueryVariables
> {
  document = models.PageEarnCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class PageGameCollectionService extends Apollo.Query<
  models.PageGameCollectionQuery,
  models.PageGameCollectionQueryVariables
> {
  document = models.PageGameCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

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
export class PageLearnCollectionService extends Apollo.Query<
  models.PageLearnCollectionQuery,
  models.PageLearnCollectionQueryVariables
> {
  document = models.PageLearnCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class PageShopCollectionService extends Apollo.Query<
  models.PageShopCollectionQuery,
  models.PageShopCollectionQueryVariables
> {
  document = models.PageShopCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class PageStreamCollectionService extends Apollo.Query<
  models.PageStreamCollectionQuery,
  models.PageStreamCollectionQueryVariables
> {
  document = models.PageStreamCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: GraphQLModule,
})
export class ProductCollectionBySlugService extends Apollo.Query<
  models.ProductCollectionBySlugQuery,
  models.ProductCollectionBySlugQueryVariables
> {
  document = models.ProductCollectionBySlugDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
