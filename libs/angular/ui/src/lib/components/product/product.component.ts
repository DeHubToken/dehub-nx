import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-product',
  template: `
    <div [dhbContentfulDraft]="product.sys">
      <p-card
        *ngIf="product"
        [header]="product.name ?? ''"
        styleClass="p-card-shadow h-full"
      >
        <ng-template pTemplate="header">
          <img
            *ngIf="
              product.picturesCollection &&
              product.picturesCollection.items[0] as firstPicture
            "
            [dhbContentfulDraft]="firstPicture.sys"
            [src]="firstPicture.url"
            [alt]="firstPicture.title"
          />
        </ng-template>
        <p>
          {{ product.shortDescription }}
        </p>
        <ng-template pTemplate="footer">
          <p-button
            [routerLink]="['/shop/' + product.slug]"
            label="Details"
            styleClass="p-button-secondary"
          ></p-button>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductFragment;

  constructor() {}

  ngOnInit() {}
}
