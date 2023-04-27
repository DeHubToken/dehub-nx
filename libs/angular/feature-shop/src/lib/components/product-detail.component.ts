import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentfulDraftDirective } from '@dehub/angular/ui/directives/contentful-draft/contentful-draft.directive';
import { ContentfulRichMarkupPipe } from '@dehub/angular/ui/pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { SafeHtmlPipe } from '@dehub/angular/ui/pipes/safe-html/safe-html.pipe';
import { ProductDetailFragment, ShopOrder } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { SwiperModule } from 'swiper/angular';
import { ProductOrdersComponent } from './product-orders.component';

@Component({
  selector: 'dhb-product-detail',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    RouterLink,
    DecimalPipe,
    // PrimeNG
    ButtonModule,
    // UI
    SafeHtmlPipe,
    ContentfulDraftDirective,
    ProductOrdersComponent,
    ContentfulRichMarkupPipe,
    // 3rd Party
    SwiperModule,
    LetModule,
  ],
  templateUrl: './product-detail.component.html',
  styles: [
    `
      @import 'swiper/scss';
      @import 'dhb_swiper_navigation';
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
  @Input() productOrders$?: Observable<ShopOrder[]>;

  constructor() {}

  ngOnInit() {}
}
