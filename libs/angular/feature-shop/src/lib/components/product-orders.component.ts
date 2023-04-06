import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AddressPipe } from '@dehub/angular/ui/pipes/address/address.pipe';
import { ShopOrder } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { Observable } from 'rxjs';

@Component({
  selector: 'dhb-product-orders',
  template: `
    <ng-container *rxLet="productOrders$ as productOrders">
      <div
        *ngIf="productOrders.length"
        class="card overview-box gray shadow-2 pt-1 pb-3 mb-3"
      >
        <div class="overview-info text-center w-full">
          <!-- Title -->
          <h6 class="pt-3 pb-3 pr-0 mb-0">
            <i class="fa-duotone fa-list-check text-xl pr-2"></i>
            {{ productOrders.length }} Orders
          </h6>

          <!-- Orders -->
          <div class="overflow-x-hidden overflow-y-auto max-h-9rem">
            <div
              *ngFor="let productOrder of productOrders; let orderCount = count"
              class="grid flex align-items-center text-right mt-2"
            >
              <div class="col-4 text-sm">
                {{ productOrder.user.ethAddress | dhbAddress }}
              </div>
              <div class="col-6 opacity-80 text-xs">
                {{ productOrder.updatedAt | date: 'M/dd/yy, H:mm' }}
              </div>
              <div class="col-2 text-sm">
                {{ productOrder.quantity }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LetModule, NgIf, NgFor, DatePipe, AddressPipe],
})
export class ProductOrdersComponent implements OnInit {
  @Input() productOrders$?: Observable<ShopOrder[]>;

  constructor() {}

  ngOnInit() {}
}
