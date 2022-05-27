import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset, PhysicalAddress, ProductCategory } from '@dehub/shared/model';
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
      <form [formGroup]="availabilityForm" class="p-fluid grid mt-5">
        <div class="field col-5 sm:col-3 col-offset-7 sm:col-offset-9">
          <span class="p-float-label">
            <p-inputNumber
              [formControlName]="'quantity'"
              [inputId]="'selectedquantity'"
              [(ngModel)]="availabilityForm.value.quantity"
              [ariaLabel]="'Quantity'"
              [ariaRequired]="true"
              [min]="1"
              [max]="product.availableQuantity"
              [allowEmpty]="false"
              [showButtons]="true"
            ></p-inputNumber>
            <label for="selectedquantity">Quantity</label>
          </span>
        </div>
      </form>

      <!-- Contact -->
      <h5>Contact Details</h5>
      <form [formGroup]="contactForm" class="p-fluid grid pt-2">
        <!-- Email -->
        <div class="field col-12 sm:col-5">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="fa-duotone fa-envelope"></i>
            </span>
            <span class="p-float-label">
              <input
                [formControlName]="'email'"
                type="text"
                id="email"
                autocomplete="email"
                pInputText
              />
              <label for="email" class="pr-5">Email Address</label>
            </span>
          </div>
        </div>

        <!-- Phone -->
        <div class="field col-12 sm:col-7 p-fluid">
          <dhb-phone-input
            [formControl]="contactForm.controls['phone'] | as: FormControl"
          ></dhb-phone-input>
        </div>
      </form>

      <!-- Shipping Address -->
      <h5>Shipping Address</h5>
      <dhb-address-form
        (valuesChanged)="shippingAddress = $event"
        (isValid)="isShippingAddressFormValid = $event"
      ></dhb-address-form>

      <!-- Total -->
      <div class="grid">
        <div class="col-12">
          <div class="flex flex-column justify-content-end text-right">
            <h5 class="align-self-end mb-1">Total</h5>
            <h3 class="align-self-end border-top-1 text-bold mt-0 pl-8 pt-1">
              {{ product.price * availabilityForm.value.quantity | number }}
              <span class="text-sm">{{ product.currency }}</span>
            </h3>
          </div>
        </div>
      </div>

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
            [disabled]="!isAllFormsValid()"
            (click)="onConfirm()"
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
    price: number;
    currency: string;
  }
> implements OnInit
{
  product?: P;
  FormControl = FormControl;

  // Contact Form
  selectedCountry?: string;
  contactForm = new FormGroup({
    email: new FormControl(undefined, [Validators.required, Validators.email]),
    phone: new FormControl(undefined, [Validators.required]),
  });

  // Availability form
  availabilityForm = new FormGroup({
    quantity: new FormControl(1),
  });

  // Shipping address form
  isShippingAddressFormValid = false;
  shippingAddress?: PhysicalAddress;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.product = this.config.data;
  }

  isAllFormsValid() {
    return [
      this.availabilityForm.valid,
      this.contactForm.valid,
      this.isShippingAddressFormValid,
    ].every(Boolean);
  }

  onConfirm() {}
}
