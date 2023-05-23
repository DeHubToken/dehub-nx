import { CurrencyPipe, NgFor, NgIf, PercentPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AddressPipe } from '@dehub/angular/ui/pipes/address/address.pipe';
import { ExplorerUrlPipe } from '@dehub/angular/ui/pipes/explorer-url/explorer-url.pipe';
import { LetModule } from '@rx-angular/template/let';
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
              <div class="text-xl">
                {{ softCapPercent | percent: '1.0-2' }}
              </div>
            </div>

            <!-- Hard Cap -->
            <div
              *ngIf="productSales.hardCapPercent as hardCapPercent"
              class="col-6 flex flex-column gap-1"
            >
              <div class="opacity-80">Hard Cap</div>
              <div class="text-xl">
                {{ hardCapPercent | percent: '1.0-2' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSalesComponent implements OnInit {
  @Input({ required: true }) productSales$?: Observable<ProductSales>;

  constructor() {}

  ngOnInit() {}
}
