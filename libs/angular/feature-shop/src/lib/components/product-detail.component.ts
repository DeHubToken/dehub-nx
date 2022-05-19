import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductDetailFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-product-detail',
  template: `
    <ng-container *ngIf="productDetail">
      <div
        [dhbContentfulDraft]="productDetail.sys"
        class="card image-card shadow-8 mx-4 bg-gradient-2 pb-5"
      >
        <!-- Main Picture -->
        <ng-container
          *ngIf="productDetail.picturesCollection!.items[0] as mainPicture"
        >
          <img
            [dhbContentfulDraft]="mainPicture.sys"
            [src]="mainPicture.url"
            [alt]="mainPicture.title"
          />
        </ng-container>

        <div class="image-content px-4 xl:px-8">
          <!-- Title -->
          <h3>{{ productDetail.name || '' }}</h3>

          <!-- Description -->
          <div
            [innerHtml]="
              productDetail.fullDescription?.json
                | dhbContentfulRichMarkup
                | dhbSafeHtml
            "
            class="line-height-3"
          ></div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  @Input() productDetail?: ProductDetailFragment;

  constructor() {}

  ngOnInit() {}
}
