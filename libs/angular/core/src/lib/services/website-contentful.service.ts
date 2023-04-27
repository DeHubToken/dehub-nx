/* eslint-disable */
import * as models from '@dehub/shared/model';
import * as Operations from '@dehub/shared/model';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementCollectionService extends Apollo.Query<
  models.AnnouncementCollectionQuery,
  models.AnnouncementCollectionQueryVariables
> {
  override document = models.AnnouncementCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class BasicPostCollectionBySlugService extends Apollo.Query<
  models.BasicPostCollectionBySlugQuery,
  models.BasicPostCollectionBySlugQueryVariables
> {
  override document = models.BasicPostCollectionBySlugDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class FooterCollectionService extends Apollo.Query<
  models.FooterCollectionQuery,
  models.FooterCollectionQueryVariables
> {
  override document = models.FooterCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class LegalPostCollectionBySlugService extends Apollo.Query<
  models.LegalPostCollectionBySlugQuery,
  models.LegalPostCollectionBySlugQueryVariables
> {
  override document = models.LegalPostCollectionBySlugDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageClubsCollectionService extends Apollo.Query<
  models.PageClubsCollectionQuery,
  models.PageClubsCollectionQueryVariables
> {
  override document = models.PageClubsCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageGameCollectionService extends Apollo.Query<
  models.PageGameCollectionQuery,
  models.PageGameCollectionQueryVariables
> {
  override document = models.PageGameCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageHomeCollectionService extends Apollo.Query<
  models.PageHomeCollectionQuery,
  models.PageHomeCollectionQueryVariables
> {
  override document = models.PageHomeCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageLearnCollectionService extends Apollo.Query<
  models.PageLearnCollectionQuery,
  models.PageLearnCollectionQueryVariables
> {
  override document = models.PageLearnCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageNewsCollectionService extends Apollo.Query<
  models.PageNewsCollectionQuery,
  models.PageNewsCollectionQueryVariables
> {
  override document = models.PageNewsCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageShopCollectionService extends Apollo.Query<
  models.PageShopCollectionQuery,
  models.PageShopCollectionQueryVariables
> {
  override document = models.PageShopCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageStreamCollectionService extends Apollo.Query<
  models.PageStreamCollectionQuery,
  models.PageStreamCollectionQueryVariables
> {
  override document = models.PageStreamCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionBySlugService extends Apollo.Query<
  models.ProductCollectionBySlugQuery,
  models.ProductCollectionBySlugQueryVariables
> {
  override document = models.ProductCollectionBySlugDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
