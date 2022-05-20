import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Asset, ProductCategory } from '@dehub/shared/model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  template: `
    <!-- Product Item -->
    <div
      *ngIf="product"
      class="card overview-box gray shadow-2 p-0 mb-3 overflow-hidden"
    >
      <div class="overview-info w-full">
        <div class="flex align-items-stretch pr-0">
          <div class="flex-grow w-5">
            <img
              [src]="product.picture.url"
              [alt]="product.picture.title"
              class="product-picture w-full h-full block "
            />
          </div>
          <div class="flex-none px-3 py-3 w-7">
            <h5 class="product-title pt-0 border-bottom-1 w-full">
              {{ product.name }}
            </h5>
            <h6
              *ngIf="product.category as category"
              class="product-category pt-0 pb-3 pr-0 mb-0"
            >
              <i [class]="category.icon + ' text-xl pr-2'"></i>
              {{ category.name || '' }}
            </h6>

            <ng-container
              *ngIf="
                product.availableQuantity && product.availableQuantity > 0;
                else soldout
              "
            >
              <span class="opacity-80 uppercase text-xs text-bold pr-1"
                >Available Quantity:</span
              >
              <span class="text-bold opacity-80">{{
                product.availableQuantity
              }}</span>
            </ng-container>
            <ng-template #soldout>
              <span class="text-bold"> Sold Out </span>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
    <!-- Quantity selection -->
    <h5 class="text-center">Coming Soon</h5>
  `,
  styles: [
    `
      .product-picture {
        object-fit: cover;
      }
      .product-title,
      .product-category {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent<
  P extends {
    picture: Asset;
    name: string;
    availableQuantity: number;
    category: ProductCategory;
  }
> implements OnInit
{
  product?: P;

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit() {
    this.product = this.config.data;
  }
}
