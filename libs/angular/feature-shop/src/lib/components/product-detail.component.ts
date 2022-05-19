import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ProductDetailFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-product-detail',
  template: `
    <ng-container *ngIf="productDetail">
      <div
        [dhbContentfulDraft]="productDetail.sys"
        class="card image-card shadow-8 mx-4 bg-gradient-2 pb-5 overflow-hidden"
      >
        <!-- Main Picture -->
        <swiper
          *ngIf="
            productDetail.picturesCollection &&
            productDetail.picturesCollection.items as pictures
          "
          class="gallery"
          [autoplay]="true"
          [pagination]="{
            clickable: true
          }"
          [navigation]="true"
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

        <div class="image-content px-4 xl:px-8">
          <!-- Title -->
          <h2 class="border-bottom-2 pb-1 mb-5">
            {{ productDetail.name || '' }}
          </h2>

          <!-- Body -->
          <div
            class="flex flex-wrap sm:flex-nowrap justify-content-end align-items-start"
          >
            <div
              [innerHtml]="
                productDetail.fullDescription?.json
                  | dhbContentfulRichMarkup
                  | dhbSafeHtml
              "
              class="flex-grow pr-3 mb-4 line-height-3"
            ></div>

            <div class="flex-none min-w-full sm:min-w-max xl:w-15rem">
              <!-- Metainfo -->
              <div
                *ngIf="productDetail.category"
                class="card overview-box gray shadow-2 pt-1 pb-3 mb-3"
              >
                <div class="overview-info text-center w-full">
                  <h6 class="pt-3 pb-2 pr-0 mb-0">
                    <i
                      [class]="productDetail.category.icon + ' text-xl pr-2'"
                    ></i>
                    {{ productDetail.category.name || '' }}
                  </h6>
                </div>
              </div>

              <!-- Price/Quantity -->
              <div class="card overview-box gray shadow-2 pt-1 pb-3">
                <div class="overview-info text-right w-full">
                  <h2 class="mt-1 mb-0 pr-0">
                    {{ productDetail.price | number }}
                  </h2>
                  <h5 class="text-sm mt-0 mb-2 opacity-80 line-height-1">
                    {{ productDetail.currency }}
                  </h5>

                  <h5 class="my-0 text-sm inline-block line-height-1 w-full">
                    <hr class="my-0 pb-2 border-dashed" />
                    <ng-container
                      *ngIf="
                        productDetail.availableQuantity &&
                          productDetail.availableQuantity > 0;
                        else soldout
                      "
                    >
                      <span class="opacity-80 uppercase text-xs text-bold pr-1"
                        >Quantity:</span
                      >
                      <span class="text-bold opacity-80">{{
                        productDetail.availableQuantity
                      }}</span>

                      <p-button
                        [routerLink]="[
                          '/shop',
                          {
                            outlets: { modal: ['checkout', productDetail.slug] }
                          }
                        ]"
                        label="Buy"
                        icon="fa-solid fa-check"
                        styleClass="p-button-primary p-button-lg mt-3 block w-full"
                      ></p-button>
                    </ng-container>

                    <ng-template #soldout>
                      <span class="text-bold"> Sold Out </span>
                    </ng-template>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      @import '~swiper/scss';
      @import '~swiper/scss/pagination';
      @import '~swiper/scss/navigation';
      /* Important for keeping all items stretched to same height */
      /*:host when ViewEncapsulation.None*/
      dhb-product-detail {
        .swiper {
          &.gallery {
            padding-bottom: 40px !important;
            .swiper-button-prev {
              right: 45px !important;
            }
            .swiper-button-prev,
            .swiper-button-next {
              z-index: 9999;
              width: 30px !important;
              height: 30px !important;
            }
          }
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  @Input() productDetail?: ProductDetailFragment;

  constructor() {}

  ngOnInit() {}
}
