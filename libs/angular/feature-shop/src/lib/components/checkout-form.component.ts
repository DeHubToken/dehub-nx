import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  DehubMoralisToken,
  EnvToken,
  IDehubMoralisService,
  ILoggerService,
  IMoralisService,
  LoggerToken,
  MoralisToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  Contacts,
  ContractPropsType,
  DeHubShopShippingAddresses,
  InitOrderParams,
  PhysicalAddress,
  ProductCheckoutDetail,
  ProductData,
} from '@dehub/shared/model';
import { BigNumber } from '@ethersproject/bignumber';
import Moralis from 'moralis';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  combineLatest,
  concatMap,
  first,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="product">
      <!-- Product Item -->
      <dhb-product-mini [product]="product"></dhb-product-mini>

      <!-- Hidden in production until finished -->
      <ng-container *ngIf="!env.production; else comingSoon">
        <!-- Quantity selection -->
        <form [formGroup]="checkoutForm" class="p-fluid grid mt-5">
          <div class="field col-5 sm:col-3 col-offset-7 sm:col-offset-9">
            <span class="p-float-label">
              <p-inputNumber
                [formControlName]="'quantity'"
                [inputId]="'selectedQuantity'"
                [(ngModel)]="checkoutForm.value.quantity"
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
          [formGroup]="checkoutForm.controls.contacts"
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
              [formControl]="checkoutForm.controls.contacts.controls.phone"
              [prefillData]="contacts.phone"
            ></dhb-phone-input>
          </div>
        </form>

        <!-- Shipping Address -->
        <h5>Shipping Address</h5>
        <dhb-address-form
          *ngIf="userShippingAddress$ | async as resp; else addressLoading"
          [formControl]="checkoutForm.controls.shippingAddress.controls.address"
          [prefillData]="resp.attributes"
        ></dhb-address-form>
        <ng-template #addressLoading>
          <p>
            <i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;Loading...
          </p>
        </ng-template>

        <!-- Total -->
        <div
          *ngIf="checkoutForm.controls.quantity.value as quantity"
          class="grid"
        >
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
              *ngIf="account$ | async as account"
              label="Confirm"
              icon="fa-regular fa-check"
              class="w-5"
              styleClass="p-button-primary p-button-lg w-full"
              [disabled]="!checkoutForm.valid"
              (click)="onConfirm(account)"
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
export class CheckoutFormComponent<P extends ProductCheckoutDetail>
  implements OnInit
{
  product?: P;

  account$?: Observable<string | undefined>;
  userContacts$?: Observable<Contacts>;
  userShippingAddress$?: Observable<DeHubShopShippingAddresses>;
  checkoutContract$?: Observable<ContractPropsType>;

  checkoutForm = this.fb.group({
    quantity: [1],
    contacts: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    }),
    shippingAddress: this.fb.group({
      address: new FormControl<PhysicalAddress | null>(null, [
        Validators.required,
      ]),
    }),
  });

  constructor(
    @Inject(MoralisToken) private moralisService: IMoralisService,
    @Inject(DehubMoralisToken) private dehubMoralis: IDehubMoralisService,
    @Inject(EnvToken) public env: SharedEnv,
    @Inject(LoggerToken) private logger: ILoggerService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit() {
    this.product = this.config.data;
    const { account$, userContacts$ } = this.moralisService;
    const { userShippingAddress$, checkoutContract$ } = this.dehubMoralis;
    this.account$ = account$;
    this.userContacts$ = userContacts$.pipe(
      tap(contacts => this.checkoutForm.controls.contacts.patchValue(contacts))
    );

    this.userShippingAddress$ = userShippingAddress$;
    this.checkoutContract$ = checkoutContract$;
  }

  onConfirm(account: string) {
    const ethers = Moralis.web3Library;
    const shippingAddress =
      this.checkoutForm.controls.shippingAddress.controls.address.value;
    if (this.product && shippingAddress && this.checkoutContract$) {
      const price = this.product.price.toString();
      const currency = this.product.currency;
      const productData: ProductData = {
        name: this.product.name,
        description: this.product.description,
        image: this.product.picture.url || '',
        sku: this.product.sku,
        category: this.product.category.name || '',
      };
      const params: InitOrderParams = {
        address: account,
        contentfulId: this.product.contentfulId,
        productData,
        shippingAddress,
      };
      // Use checkout contract data from the API and token metadata from the blockchain
      combineLatest([
        this.checkoutContract$,
        this.moralisService.getTokenMetadata(currency),
      ])
        .pipe(
          first(),
          concatMap(([checkoutContract, metadata]) =>
            this.moralisService
              .getTokenAllowance(
                metadata.address,
                checkoutContract.address,
                metadata.decimals
              )
              .pipe(
                map(
                  allowance =>
                    [
                      allowance,
                      ethers.utils.parseUnits(price, metadata.decimals),
                    ] as [BigNumber, BigNumber]
                ),
                concatMap(([allowance, parsedPrice]) => {
                  // Check if we have enough allowance
                  if (allowance.gte(parsedPrice)) {
                    return of(undefined);
                  } else {
                    // Increase allowance to max and wait for confirmation
                    return this.moralisService.setTokenAllowance(
                      metadata.address,
                      checkoutContract.address
                    );
                  }
                }),
                concatMap(() => this.dehubMoralis.initOrder(params)),
                concatMap(({ orderId, ipfsHash }) =>
                  this.dehubMoralis.mintReceipt(
                    orderId,
                    ipfsHash,
                    checkoutContract,
                    currency,
                    ethers.utils.parseUnits(price, metadata.decimals)
                  )
                ),
                map(txReceipt => {
                  this.logger.info(`Initialized order and minted receipt!`);
                  // console.log(txReceipt);
                })
              )
          )
        )
        .subscribe();
    } else {
      throw new Error(
        'Product, shipping address or checkout contract is missing!'
      );
    }
  }
}
