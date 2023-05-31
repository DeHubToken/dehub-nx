import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductFragment } from '@dehub/shared/model';
import { ButtonModule } from 'primeng/button';

import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SwiperOptions } from 'swiper';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { SwiperDirective } from '../../directives/swiper/swiper.directive';
import { ProductInfoComponent } from './product-info.component';

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
    SwiperDirective,
    ProductInfoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product.component.html',
  styles: [
    `
      /* Important for keeping all items stretched to same height */
      :host {
        height: 100%;
        & > div {
          height: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductFragment;

  swiperOptions: SwiperOptions = {};

  constructor() {}

  ngOnInit() {}
}
