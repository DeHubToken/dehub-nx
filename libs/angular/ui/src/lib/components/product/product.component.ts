import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductFragment } from '@dehub/shared/model';
import { ButtonModule } from 'primeng/button';
import { SwiperModule } from 'swiper/angular';

import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-product',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    RouterLink,
    DecimalPipe,
    // PrimeNG
    CardModule,
    ButtonModule,
    // UI
    ContentfulDraftDirective,
    // 3rd Party
    SwiperModule,
  ],
  templateUrl: './product.component.html',
  styles: [
    `
      @import 'swiper/scss';
      @import 'swiper/scss/pagination';
      @import 'swiper/scss/lazy';
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
