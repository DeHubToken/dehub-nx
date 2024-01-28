import { Inject, Injectable } from '@angular/core';
import { ProductCollectionBySlugService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { ProductDetailFragment, SharedEnv } from '@dehub/shared/model';

import { filter, map, Observable } from 'rxjs';

@Injectable()
export class ProductDetailService {
  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private productDetailBySlugService: ProductCollectionBySlugService
  ) {}

  getProductDetailBySlug(
    slug?: string
  ): Observable<ProductDetailFragment | undefined> {
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
