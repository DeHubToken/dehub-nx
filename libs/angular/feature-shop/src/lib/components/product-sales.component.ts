import { CurrencyPipe, NgFor, NgIf, PercentPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AddressPipe } from '@dehub/angular/ui/pipes/address/address.pipe';
import { ExplorerUrlPipe } from '@dehub/angular/ui/pipes/explorer-url/explorer-url.pipe';
import { animationDuration } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { jelloAnimation, rubberBandAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { ProductSales } from '../model/product.model';

@Component({
  selector: 'dhb-product-sales',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    CurrencyPipe,
    PercentPipe,
    // UI
    AddressPipe,
    ExplorerUrlPipe,
    // 3rd Party
    LetModule,
  ],
  template: `
    <ng-container *rxLet="productSales$ as productSales">
      <div
        *ngIf="productSales.totalSales > 0"
        class="card overview-box gray shadow-2 pt-1 pb-3 mb-3"
      >
        <div class="overview-info text-center w-full">
          <!-- Title -->
          <h6 class="pt-3 pb-3 pr-0 mb-0">
            <i class="fa-duotone fa-chart-line-up text-xl pr-2"></i>
            Sales
          </h6>

          <!-- Sales -->
          <div class="grid text-sm mt-2">
            <!-- Total Sales -->
            <div class="col-6">
              <div class="opacity-80">Total</div>
              <div class="text-xl">
                {{ productSales.totalSales | currency: 'USD':'symbol':'1.0-2' }}
              </div>
            </div>

            <!-- Remaining Sales -->
            <div class="col-6">
              <div class="opacity-80">Remaining</div>
              <div class="text-xl">
                {{
                  productSales.remainingSales | currency: 'USD':'symbol':'1.0-2'
                }}
              </div>
            </div>

            <!-- Soft Cap -->
            <div
              *ngIf="productSales.softCapPercent as softCapPercent"
              class="col-6 flex flex-column gap-1"
            >
              <div class="opacity-80">Soft Cap</div>
              <div
                [@animateSoftCap]="softCapPercent === 1 && animSmallCapState"
                (@animateSoftCap.done)="animSmallCapState = !animSmallCapState"
                class="text-xl"
              >
                {{ softCapPercent | percent: '1.0-2' }}
              </div>
            </div>

            <!-- Hard Cap -->
            <div
              *ngIf="productSales.hardCapPercent as hardCapPercent"
              class="col-6 flex flex-column gap-1"
            >
              <div class="opacity-80">Hard Cap</div>
              <div
                [@animateHardCap]="hardCapPercent === 1 && animHardCapState"
                (@animateHardCap.done)="animHardCapState = !animHardCapState"
                class="text-xl"
              >
                {{ hardCapPercent | percent: '1.0-2' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    jelloAnimation({
      anchor: 'animateSoftCap',
      duration: 3 * animationDuration,
      delay: 2 * animationDuration,
    }),
    rubberBandAnimation({
      anchor: 'animateHardCap',
      duration: 3 * animationDuration,
      delay: 2 * animationDuration,
    }),
  ],
})
export class ProductSalesComponent implements OnInit {
  @Input({ required: true }) productSales$?: Observable<ProductSales>;

  animSmallCapState = false;
  animHardCapState = false;

  constructor() {}

  ngOnInit() {}
}
