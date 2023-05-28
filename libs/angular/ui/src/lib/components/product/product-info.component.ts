import {
  CurrencyPipe,
  DecimalPipe,
  NgIf,
  NgOptimizedImage,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/model';
import { ProductDetailFragment, SharedEnv } from '@dehub/shared/model';
import { getDehubPrice } from '@dehub/shared/utils';
import { PushModule } from '@rx-angular/template/push';
import BigNumber from 'bignumber.js';
import { from, map } from 'rxjs';

@Component({
  selector: 'dhb-product-info',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    DecimalPipe,
    CurrencyPipe,
    NgTemplateOutlet,
    NgOptimizedImage,
    // 3rd Party
    PushModule,
  ],
  template: `
    <div class="card overview-box gray shadow-2 pt-1 pb-3 mb-3">
      <div class="overview-info text-right w-full">
        <!-- Bundle price -->
        <div *ngIf="isBundle; else notBundle" class="grid pr-0">
          <div class="col-6 pb-0">
            <!-- DHB price -->
            <ng-container
              *ngTemplateOutlet="
                priceWithCurrency;
                context: {
                  price: productDehubPrice$ | push,
                  currency: '$DHB',
                  estimated: true
                }
              "
            />
          </div>

          <div class="col-6 pb-0">
            <!-- BUSD price -->
            <ng-container
              *ngTemplateOutlet="
                priceWithCurrency;
                context: {
                  price: productDetail.price,
                  currency: productDetail.currency,
                  estimated: false
                }
              "
            />
          </div>
        </div>

        <!-- NOT Bundle price -->
        <ng-template #notBundle>
          <!-- BUSD price -->
          <ng-container
            *ngTemplateOutlet="
              priceWithCurrency;
              context: {
                price: productDetail.price,
                currency: productDetail.currency,
                estimated: false
              }
            "
          />
        </ng-template>

        <!-- Price and Currency template -->
        <ng-template
          #priceWithCurrency
          let-price="price"
          let-currency="currency"
          let-estimated="estimated"
        >
          <!--  Price -->
          <h2 class="mt-1 mb-0 pr-0">
            <span *ngIf="estimated" class="vertical-align-sub line-height-1"
              >~</span
            >{{ price | number : '1.0-2' }}
          </h2>

          <!-- Currency -->
          <div [class.flex]="estimated" [class.justify-content-end]="estimated">
            <h5 class="text-sm mt-0 mb-2 opacity-80 line-height-1">
              {{ currency }}
            </h5>
            <img
              *ngIf="estimated"
              [ngSrc]="coingeckoUrl"
              height="12"
              width="12"
              alt="Coingecko logo"
              title="Powered by CoinGecko"
              class="ml-1 opacity-80"
            />
          </div>
        </ng-template>

        <!-- Quantity -->
        <h5 class="my-0 text-sm inline-block line-height-1 w-full">
          <hr class="my-0 pb-2 border-dashed" />

          <ng-container
            *ngIf="productDetail.availableQuantity ?? 0 > 0; else unavailable"
          >
            <span class="text-bold opacity-80">{{
              productDetail.availableQuantity
            }}</span>
            <span class="opacity-80 text-xs text-bold pr-1">
              left in stock</span
            >

            <!-- Info content -->
            <ng-content />
          </ng-container>

          <ng-template #unavailable>
            <!-- Paused -->
            <span *ngIf="productDetail.pause; else soldOut" class="text-bold">
              Coming Soon
            </span>

            <!-- Sold Out -->
            <ng-template #soldOut>
              <span class="text-bold">
                {{ productDetail.soldOutLabel || 'Sold Out' }}
              </span>
            </ng-template>
          </ng-template>
        </h5>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit {
  @Input({ required: true }) productDetail!: ProductDetailFragment;

  productDehubPrice$ = from(getDehubPrice()).pipe(
    map(dehubPriceStr =>
      new BigNumber(dehubPriceStr)
        .times(this.productDetail.price ?? 0)
        .toNumber()
    )
  );

  isBundle = false;

  coingeckoUrl = `${this.env.baseUrl}/assets/dehub/icons/coingecko.svg`;

  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  ngOnInit() {
    this.isBundle = this.productDetail.category?.name === 'Bundles';
  }
}
