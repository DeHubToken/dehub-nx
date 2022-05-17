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
        styleClass="p-card-shadow h-full"
      >
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
        <p>
          {{ product.shortDescription }}
        </p>
        <ng-template pTemplate="footer">
          <p-button
            [routerLink]="['/shop/' + product.slug]"
            label="Details"
            styleClass="p-button-secondary"
          ></p-button>
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
