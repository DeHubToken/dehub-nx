import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ShopOrder } from '@dehub/shared/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'dhb-product-orders',
  template: `
    <ng-container
      *rxFor="
        let productOrder of productOrders$;
        let i = index;
        let isEven = even
      "
    >
      {{ i + 1 }}. - {{ productOrder.user.ethAddress }}:
      {{ productOrder.quantity }}
      <br />
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOrdersComponent implements OnInit {
  @Input() productOrders$?: Observable<ShopOrder[]>;

  constructor() {}

  ngOnInit() {}
}
