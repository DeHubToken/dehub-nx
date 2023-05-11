import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
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
import { Observable } from 'rxjs';
import { SwiperOptions } from 'swiper';
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
    SwiperDirective,
    // 3rd Party
    LetModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  @Input() productDetail$?: Observable<ProductDetailFragment>;
  @Input() productOrders$?: Observable<ShopOrder[]>;

  swiperOptions: SwiperOptions = {
    navigation: true,
    autoplay: true,
    pagination: { clickable: true },
  };

  constructor() {}

  ngOnInit() {}
}
