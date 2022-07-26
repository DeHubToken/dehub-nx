import { Inject, Injectable } from '@angular/core';
import { ProductCollectionBySlugService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { ProductDetailFragment } from '@dehub/shared/model';

import { filter, map, Observable } from 'rxjs';

@Injectable()
export class ProductDetailService {
  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private productDetailBySlugService: ProductCollectionBySlugService
  ) {}

  getProductDetailBySlug(slug?: string): Observable<ProductDetailFragment> {
    return this.productDetailBySlugService
      .watch({
        slug,
        isPreview: this.env.contentful.isPreview,
      })
      .valueChanges.pipe(
        filter(({ loading }) => !loading),
        map(
          ({ data: { productCollection } }) =>
            (productCollection?.items[0] as ProductDetailFragment) ?? undefined
        )
      );
  }
}
