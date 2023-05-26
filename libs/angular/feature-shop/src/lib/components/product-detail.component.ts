import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentfulDraftDirective } from '@dehub/angular/ui/directives/contentful-draft/contentful-draft.directive';
import { SwiperDirective } from '@dehub/angular/ui/directives/swiper/swiper.directive';
import { ContentfulRichMarkupPipe } from '@dehub/angular/ui/pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { SafeHtmlPipe } from '@dehub/angular/ui/pipes/safe-html/safe-html.pipe';
import { ProductDetailFragment, ShopOrder } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { ButtonModule } from 'primeng/button';
import { Observable, combineLatest, map } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { ProductSales } from '../model/product.model';
import { ProductOrdersComponent } from './product-orders.component';
import { ProductSalesComponent } from './product-sales.component';

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
    ProductSalesComponent,
    ContentfulRichMarkupPipe,
    SwiperDirective,
    // 3rd Party
    LetModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  @Input({ required: true }) productDetail$!: Observable<ProductDetailFragment>;
  @Input({ required: true }) productOrders$!: Observable<ShopOrder[]>;

  swiperOptions: SwiperOptions = {
    autoplay: true,
    pagination: { clickable: true },
  };

  productSales$?: Observable<ProductSales>;

  constructor() {}

  ngOnInit() {
    this.productSales$ = combineLatest([
      this.productDetail$,
      this.productOrders$,
    ]).pipe(
      map(
        ([
          { price = 0, availableQuantity = 0, softCap, hardCap },
          productOrders,
        ]) => {
          const totalSales = productOrders.reduce(
            (totalSales, { totalAmount }) => totalSales + totalAmount,
            0
          );
          const remainingSales = price * availableQuantity;
          const softCapPercent = softCap
            ? totalSales >= softCap
              ? 1
              : totalSales / softCap
            : undefined;
          const hardCapPercent = hardCap
            ? totalSales >= hardCap
              ? 1
              : totalSales / hardCap
            : undefined;

          return {
            totalSales,
            remainingSales,
            softCapPercent,
            hardCapPercent,
          };
        }
      )
    );
  }
}
