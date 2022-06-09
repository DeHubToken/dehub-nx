import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DehubMoralisToken,
  EnvToken,
  IDehubMoralisService,
  IMoralisService,
  MoralisToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  Asset,
  Contacts,
  DeHubShopShippingAddresses,
  ProductCategory,
} from '@dehub/shared/model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="product">
      <!-- Product Item -->
      <dhb-product-mini [product]="product"></dhb-product-mini>

      <!-- Hidden in production until finished -->
      <ng-container *ngIf="!env.production; else comingSoon">
        <!-- Quantity selection -->
        <form [formGroup]="availabilityForm" class="p-fluid grid mt-5">
          <div class="field col-5 sm:col-3 col-offset-7 sm:col-offset-9">
            <span class="p-float-label">
              <p-inputNumber
                [formControlName]="'quantity'"
                [inputId]="'selectedQuantity'"
                [(ngModel)]="availabilityForm.value.quantity"
                [ariaLabel]="'Quantity'"
                [ariaRequired]="true"
                [min]="1"
                [max]="product.availableQuantity"
                [allowEmpty]="false"
                [showButtons]="true"
              ></p-inputNumber>
              <label for="selectedQuantity">Quantity</label>
            </span>
          </div>
        </form>

        <!-- Contact -->
        <h5>Contact Details</h5>
        <form
          *ngIf="userContacts$ | async as contacts"
          [formGroup]="contactForm"
          class="p-fluid grid pt-2"
        >
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
              [formControl]="contactForm.controls.phone"
              [prefillData]="contacts.phone"
            ></dhb-phone-input>
          </div>
        </form>

        <!-- Shipping Address -->
        <h5>Shipping Address</h5>
        <dhb-address-form
          *ngIf="userShippingAddress$ | async as resp; else addressLoading"
          [formControl]="shippingAddressForm.controls.address"
          [prefillData]="resp.attributes"
        ></dhb-address-form>
        <ng-template #addressLoading>
          <p>
            <i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;Loading...
          </p>
        </ng-template>

        <!-- Total -->
        <div *ngIf="availabilityForm.value.quantity as quantity" class="grid">
          <div class="col-12">
            <div class="flex flex-column justify-content-end text-right">
              <h5 class="align-self-end mb-1">Total</h5>
              <h3 class="align-self-end border-top-1 text-bold mt-0 pl-8 pt-1">
                {{ product.price * quantity }}
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

      <ng-template #comingSoon>
        <div class="text-center py-5">
          <i class="fa-duotone fa-user-helmet-safety text-4xl pb-3"></i>
          <br />
          Coming soon...
        </div>
      </ng-template>
    </ng-container>
  `,
  styles: [``],
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
  FormControl = FormControl; // for in-template casting

  // Availability form
  availabilityForm = new FormGroup({
    quantity: new FormControl(1),
  });

  // Contact Form
  userContacts$?: Observable<Contacts>;
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
  });

  // Shipping Address Form
  userShippingAddress$?: Observable<DeHubShopShippingAddresses>;
  shippingAddressForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MoralisToken) private moralisService: IMoralisService,
    @Inject(DehubMoralisToken) private dehubMoralis: IDehubMoralisService,
    @Inject(EnvToken) public env: SharedEnv,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.product = this.config.data;
    const { userContacts$ } = this.moralisService;
    const { userShippingAddress$ } = this.dehubMoralis;
    this.userContacts$ = userContacts$.pipe(
      tap(contacts => this.contactForm.patchValue(contacts))
    );
    this.userShippingAddress$ = userShippingAddress$;
  }

  isAllFormsValid() {
    return [
      this.availabilityForm.valid,
      this.contactForm.valid,
      this.shippingAddressForm.valid,
    ].every(Boolean);
  }

  onConfirm() {}
}
