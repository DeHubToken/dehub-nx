import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Asset, ProductCategory } from '@dehub/shared/model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  template: `
    <ng-container *ngIf="product">
      <!-- Product Item -->
      <div class="card overview-box gray shadow-2 p-0 mb-3 overflow-hidden">
        <div class="overview-info w-full">
          <div class="flex align-items-stretch pr-0">
            <div class="flex-grow w-5">
              <img
                [src]="product.picture.url"
                [alt]="product.picture.title"
                class="product-picture w-full h-full block "
              />
            </div>
            <div class="flex-none px-3 py-3 w-7">
              <h5 class="product-title pt-0 border-bottom-1 w-full">
                {{ product.name }}
              </h5>
              <h6
                *ngIf="product.category as category"
                class="product-category pt-0 pb-3 pr-0 mb-0"
              >
                <i [class]="category.icon + ' text-xl pr-2'"></i>
                {{ category.name || '' }}
              </h6>

              <ng-container
                *ngIf="
                  product.availableQuantity && product.availableQuantity > 0;
                  else soldout
                "
              >
                <span class="opacity-80 uppercase text-xs text-bold pr-1"
                  >Available Quantity:</span
                >
                <span class="text-bold opacity-80">{{
                  product.availableQuantity
                }}</span>
              </ng-container>
              <ng-template #soldout>
                <span class="text-bold"> Sold Out </span>
              </ng-template>
            </div>
          </div>
        </div>
      </div>

      <!-- Quantity selection -->
      <form
        [formGroup]="availabilityForm"
        #f="ngForm"
        class="p-fluid grid mt-5"
      >
        <div class="field col-5 sm:col-3 col-offset-7 sm:col-offset-9">
          <span class="p-float-label">
            <p-inputNumber
              inputId="selectedquantity"
              formControlName="quantity"
              [(ngModel)]="selectedQuantity"
              [ariaLabel]="'Quantity'"
              [ariaRequired]="true"
              [min]="1"
              [max]="product.availableQuantity"
              [allowEmpty]="false"
              [showButtons]="true"
            ></p-inputNumber>
            <label for="inputnumber">Quantity</label>
          </span>
        </div>
      </form>

      <!-- Footer -->
      <div class="grid">
        <div
          class="flex justify-content-end col-12 sm:col-8 col-offset-0 sm:col-offset-4 text-right"
        >
          <p-button
            label="Cancel"
            class="w-5"
            styleClass="p-button-secondary p-button-lg mr-2"
            (click)="ref.close()"
          ></p-button>
          <p-button
            label="Confirm"
            icon="fa-regular fa-check"
            class="w-5"
            styleClass="p-button-primary p-button-lg w-full"
            [disabled]="!isAllValid"
          ></p-button>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .product-picture {
        object-fit: cover;
      }
      .product-title,
      .product-category {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent<
  P extends {
    picture: Asset;
    name: string;
    availableQuantity: number;
    category: ProductCategory;
  }
> implements OnInit
{
  product?: P;
  // Form
  isAllValid = false;
  selectedQuantity = 1;
  @ViewChild('f', { static: true }) f?: NgForm;
  availabilityForm = new FormGroup({
    quantity: new FormControl(undefined),
  });

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.product = this.config.data;

    // Check if all forms validity changed on each keystroke.
    this.availabilityForm.valueChanges.subscribe(
      () => (this.isAllValid = this.availabilityForm.valid)
    );
  }
}
