import {
  DecimalPipe,
  NgIf,
  NgOptimizedImage,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/model';
import { ProductDetailFragment, SharedEnv } from '@dehub/shared/model';
import { getDehubPrice } from '@dehub/shared/utils';
import { LetModule } from '@rx-angular/template/let';
import BigNumber from 'bignumber.js';
import { from, map } from 'rxjs';
import { SIPostfixPipe } from '../../pipes/si-postfix/si-postfix.pipe';
import { FlipCardComponent } from '../flip-card/flip-card.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'dhb-product-info',
  standalone: true,
  templateUrl: './product-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Angular
    NgIf,
    DecimalPipe,
    NgTemplateOutlet,
    NgOptimizedImage,
    // Lib
    LoadingComponent,
    FlipCardComponent,
    SIPostfixPipe,
    // 3rd Party
    LetModule,
  ],
})
export class ProductInfoComponent implements OnInit {
  @Input({ required: true }) productDetail!: ProductDetailFragment;
  @Input() larger = false;

  productDehubPrice$ = from(getDehubPrice()).pipe(
    map(dehubPriceStr =>
      new BigNumber(this.productDetail.price ?? 0)
        .dividedBy(new BigNumber(dehubPriceStr))
        .toNumber()
    )
  );

  isBundle = false;

  coingeckoUrl = `${this.env.baseUrl}/assets/dehub/icons/coingecko.svg`;

  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  ngOnInit() {
    this.isBundle = this.productDetail.category?.name === 'Bundles';
  }
}
