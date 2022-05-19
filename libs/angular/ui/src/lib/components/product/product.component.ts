import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ProductFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-product',
  template: `
    <div [dhbContentfulDraft]="product.sys">
      <p-card
        *ngIf="product"
        [header]="product.name ?? ''"
        styleClass="product p-card-shadow h-full"
      >
        <!-- Header -->
        <ng-template pTemplate="header">
          <swiper
            *ngIf="
              product.picturesCollection &&
              product.picturesCollection.items as pictures
            "
            class="gallery"
            [pagination]="true"
          >
            <ng-container *ngFor="let picture of pictures">
              <ng-template swiperSlide>
                <img
                  *ngIf="picture"
                  [dhbContentfulDraft]="picture.sys"
                  [src]="picture.url"
                  [alt]="picture.title"
                />
              </ng-template>
            </ng-container>
          </swiper>
        </ng-template>
        <!-- Body -->
        <div
          class="flex flex-wrap sm:flex-nowrap justify-content-end align-items-start"
        >
          <div class="flex-grow pr-3 mb-4">
            <p>
              {{ product.shortDescription }}
            </p>
          </div>

          <div
            class="card overview-box gray shadow-2 flex-none pt-1 pb-3 min-w-full sm:min-w-max"
          >
            <div class="overview-info text-right w-full">
              <!-- <h5 class="pr-0 mb-0">Price</h5>
              <hr class="my-0 border-dashed" /> -->
              <h3 class="mt-1 mb-0 pr-0">10,000</h3>
              <h6 class="text-sm mb-2 opacity-80">DeHub</h6>

              <h6 class="my-0 text-sm inline-block">
                <hr class="my-0 pb-1 border-dashed" />
                <span class="opacity-80 uppercase text-xs text-bold pr-1"
                  >Quantity:</span
                >
                <span class="text-bold opacity-80">123</span>
              </h6>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <ng-template pTemplate="footer">
          <div class="flex justify-content-end">
            <p-button
              [routerLink]="['/shop/' + product.slug]"
              label="Details"
              styleClass="p-button-secondary p-button-lg"
            ></p-button>
            <p-button
              [routerLink]="['/shop/' + product.slug]"
              label="Buy"
              icon="fa-solid fa-check"
              styleClass="p-button-primary p-button-lg ml-2"
            ></p-button>
          </div>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      @import '~swiper/scss';
      @import '~swiper/scss/pagination';
      /* Important for keeping all items stretched to same height */
      /*:host when ViewEncapsulation.None*/
      dhb-product {
        height: 100%;
        & > div {
          height: 100%;
        }
        .swiper {
          &.gallery {
            padding-bottom: 0 !important;
          }
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductFragment;

  constructor() {}

  ngOnInit() {}
}
