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
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CoingeckoToken,
  EnvToken,
  ICoingeckoService,
} from '@dehub/angular/model';
import { ProductDetailFragment, SharedEnv } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import BigNumber from 'bignumber.js';
import { map, takeWhile } from 'rxjs';
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
    // UI
    LoadingComponent,
    FlipCardComponent,
    SIPostfixPipe,
    // 3rd Party
    LetModule,
  ],
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  @Input({ required: true }) productDetail!: ProductDetailFragment;
  @Input() increaseFontSize = false;

  private isAlive = true;

  productDehubPrice$ = this.coingeckoService.getDehubUsdPricePoll$().pipe(
    takeWhile(() => this.isAlive),
    map(dehubPriceStr =>
      new BigNumber(this.productDetail.price ?? 0)
        .dividedBy(new BigNumber(dehubPriceStr))
        .toNumber()
    )
  );

  isBundle = false;

  coingeckoUrl = `${this.env.baseUrl}/assets/dehub/icons/coingecko.svg`;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(CoingeckoToken) private coingeckoService: ICoingeckoService
  ) {}

  ngOnInit() {
    this.isBundle = this.productDetail.category?.name === 'Bundles';
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
