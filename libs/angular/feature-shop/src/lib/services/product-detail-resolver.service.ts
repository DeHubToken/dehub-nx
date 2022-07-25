import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductCollectionBySlugService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { ProductDetailFragment } from '@dehub/shared/model';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductDetailResolver
  implements Resolve<ProductDetailFragment | undefined>
{
  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private productDetailBySlugService: ProductCollectionBySlugService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ProductDetailFragment | undefined> {
    const slug = route.paramMap.get('slug') ?? undefined;

    return this.productDetailBySlugService
      .fetch({
        slug,
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { productCollection } }) =>
            productCollection?.items[0] ?? undefined
        )
      );
  }
}
