import {
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
import { LetModule } from '@rx-angular/template/let';
import BigNumber from 'bignumber.js';
import { from, map } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'dhb-product-info',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    DecimalPipe,
    NgTemplateOutlet,
    NgOptimizedImage,
    // Lib
    LoadingComponent,
    // 3rd Party
    LetModule,
  ],
  template: `
    <div
      [class.min-w-full]="!isBundle"
      [class.sm:min-w-max]="!isBundle"
      class="card overview-box gray shadow-2 pt-1 pb-3 mb-3"
    >
      <div class="overview-info text-right w-full">
        <!-- Bundle price -->
        <div *ngIf="isBundle; else notBundle" class="grid pr-0">
          <div class="col-6 pb-0">
            <!-- DHB price -->
            <ng-container
              *rxLet="
                productDehubPrice$ as productDehubPrice;
                suspense: loading
              "
            >
              <ng-container
                *ngTemplateOutlet="
                  priceWithCurrency;
                  context: {
                    price: productDehubPrice,
                    currency: '$DHB',
                    estimated: true
                  }
                "
              />
            </ng-container>

            <!-- Loading Template -->
            <ng-template #loading>
              <dhb-loading
                iconClass="fa-duotone fa-circle-dollar fa-2xl fa-spin"
              />
            </ng-template>
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
          <h3 class="mt-1 mb-0 pr-0">
            <!-- Estimated -->
            <ng-container *ngIf="estimated; else accurate">
              <span *ngIf="estimated" class="vertical-align-sub line-height-1"
                >~</span
              >{{ price }}
            </ng-container>

            <!-- Accurate -->
            <ng-template #accurate>
              {{ price | number : '.0-2' }}
            </ng-template>
          </h3>

          <!-- Currency -->
          <div [class.flex]="estimated" [class.justify-content-end]="estimated">
            <h6 class="text-sm mt-0 mb-2 opacity-80 line-height-1">
              {{ currency }}
            </h6>
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
        <h6 class="my-0 text-sm inline-block line-height-1 w-full">
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
        </h6>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit {
  @Input({ required: true }) productDetail!: ProductDetailFragment;
  @Input() larger = false;

  productDehubPrice$ = from(getDehubPrice()).pipe(
    map(dehubPriceStr =>
      new BigNumber(this.productDetail.price ?? 0)
        .dividedBy(new BigNumber(dehubPriceStr))
        .toNumber()
    ),
    map(price => {
      const unitList = ['', 'K', 'M', 'B', 'T'];

      const formatNumber = (num: number) => {
        let unit = 0;

        while (Math.abs(num) > 1000) {
          num = Math.floor(Math.abs(num) / 100) / 10;
          unit++;
        }
        return `${Math.sign(num) * Math.abs(num)} ${unitList[unit]}`;
      };

      return formatNumber(price);
    })
    // delay(6000)
  );

  isBundle = false;

  coingeckoUrl = `${this.env.baseUrl}/assets/dehub/icons/coingecko.svg`;

  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  ngOnInit() {
    this.isBundle = this.productDetail.category?.name === 'Bundles';
  }
}
