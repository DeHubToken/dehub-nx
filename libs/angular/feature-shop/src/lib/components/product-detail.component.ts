import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ProductDetailFragment } from '@dehub/shared/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'dhb-product-detail',
  template: `
    <ng-container *rxLet="productDetail$ as productDetail">
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
              <!-- Meta Info -->
              <div
                *ngIf="productDetail.category as category"
                class="card overview-box gray shadow-2 pt-1 pb-3 mb-3"
              >
                <div class="overview-info text-center w-full">
                  <h6 class="pt-3 pb-2 pr-0 mb-0">
                    <i [class]="category.icon + ' text-xl pr-2'"></i>
                    {{ category.name || '' }}
                  </h6>
                </div>
              </div>

              <!-- Price Widget -->
              <div class="card overview-box gray shadow-2 pt-1 pb-3">
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
                      *ngIf="
                        productDetail.availableQuantity ?? 0 > 0;
                        else unavailable
                      "
                    >
                      <span class="opacity-80 uppercase text-xs text-bold pr-1"
                        >Remaining:</span
                      >
                      <span class="text-bold opacity-80">{{
                        productDetail.availableQuantity
                      }}</span>

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
                      <span
                        *ngIf="productDetail.pause; else soldOut"
                        class="text-bold"
                      >
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
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      @import 'swiper/scss';
      @import '@dehub/swiper/dhb_swiper_navigation';
      @import 'swiper/scss/pagination';
      @import 'swiper/scss/navigation';
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
  @Input() productDetail$?: Observable<ProductDetailFragment>;

  constructor() {}

  ngOnInit() {}
}
