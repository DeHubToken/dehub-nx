import { DecimalPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDetailFragment } from '@dehub/shared/model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'dhb-product-info',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    RouterLink,
    DecimalPipe,
    // PrimeNG
    ButtonModule,
  ],
  template: `
    <div class="card overview-box gray shadow-2 pt-1 pb-3 mb-3">
      <div class="overview-info text-right w-full">
        <!-- Price -->
        <h2 class="mt-1 mb-0 pr-0">
          {{ productDetail.price | number }}
        </h2>

        <!-- Currency -->
        <h5 class="text-sm mt-0 mb-2 opacity-80 line-height-1">
          {{ productDetail.currency }}
        </h5>

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

            <!-- Buy / Coming Soon -->
            <p-button
              [routerLink]="
                productDetail.pause
                  ? null
                  : [
                      '/shop',
                      {
                        outlets: {
                          modal: ['checkout', productDetail.slug]
                        }
                      }
                    ]
              "
              [label]="productDetail.pause ? 'Coming Soon' : 'Buy'"
              [disabled]="productDetail.pause ?? false"
              icon="fa-solid fa-check"
              styleClass="p-button-primary p-button-lg mt-3 block w-full"
            ></p-button>
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
export class ProductInfoComponent {
  @Input({ required: true }) productDetail!: ProductDetailFragment;
}
