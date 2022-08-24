import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { provideDehubLoggerWithScope } from '@dehub/angular/core';
import {
  ContentfulManagementToken,
  DehubMoralisToken,
  EnvToken,
  IContentFulManagementService,
  IDehubMoralisService,
  ILoggerService,
  IMoralisService,
  LoggerDehubToken,
  MoralisToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  Contacts,
  Currency,
  DeHubShopShippingAddress,
  InitOrderParams,
  OrderStatus,
  PhysicalAddress,
  ProductCheckoutDetail,
} from '@dehub/shared/model';
import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import {
  filterNil,
  getContractByCurrency,
  publishReplayRefCount,
  shortenAddress,
} from '@dehub/shared/utils';
import { BigNumber } from '@ethersproject/bignumber';
import Moralis from 'moralis';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  filter,
  finalize,
  first,
  map,
  Observable,
  of,
  repeatWhen,
  switchMap,
  tap,
  withLatestFrom,
  zip,
} from 'rxjs';
import {
  CheckoutMessage,
  CheckoutProcess,
  CheckoutProcessMessage,
} from '../model/checkout-form.model';

@Component({
  template: `
    <ng-container *rxLet="productDetail$ as productDetail">
      <ng-container *rxLet="isProcessing$ as isProcessing">
        <ng-container *ngIf="!isProcessing; else message">
          <!-- Product Item -->
          <dhb-product-mini [product]="productDetail"></dhb-product-mini>

          <ng-container>
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
                    [max]="productDetail.availableQuantity"
                    [allowEmpty]="false"
                    [showButtons]="true"
                  ></p-inputNumber>
                  <label for="selectedQuantity">Quantity</label>
                </span>
              </div>
            </form>

            <ng-container *rxLet="hasAllowance$ as hasAllowance">
              <ng-container *ngIf="hasAllowance">
                <!-- Contact -->
                <h5>Contact Details</h5>
                <dhb-contacts-form
                  *ngIf="userContacts$ | async as contacts; else loading"
                  [formControl]="checkoutForm.controls.contacts"
                  [prefillData]="contacts"
                >
                </dhb-contacts-form>

                <!-- Shipping Address -->

                <h5>Shipping Address</h5>
                <dhb-address-form
                  *ngIf="userShippingAddress$ | async as address; else loading"
                  [formControl]="checkoutForm.controls.shippingAddress"
                  [prefillData]="
                    !isShippingAddressResponseEmpty(address)
                      ? address.attributes
                      : undefined
                  "
                ></dhb-address-form>
              </ng-container>

              <!-- Total -->
              <div
                *ngIf="checkoutForm.controls.quantity.value as quantity"
                class="grid"
              >
                <div class="col-12">
                  <div class="flex flex-column justify-content-end text-right">
                    <h5 class="align-self-end mb-1">Total</h5>
                    <h3
                      class="align-self-end border-top-1 text-bold mt-0 pl-8 pt-1"
                    >
                      {{ calcTotalAmount(productDetail.price, quantity) }}
                      <span class="text-sm">{{ productDetail.currency }}</span>
                    </h3>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="grid">
                <div
                  class="flex justify-content-end col-12 sm:col-8 col-offset-0 sm:col-offset-4 text-right"
                >
                  <!-- Cancel -->
                  <p-button
                    label="Cancel"
                    class="w-5"
                    styleClass="p-button-secondary p-button-lg mr-2"
                    (click)="ref.close()"
                  ></p-button>

                  <!-- Approve -->
                  <p-button
                    *ngIf="!hasAllowance; else confirm"
                    label="Approve"
                    icon="fa-regular fa-check"
                    class="w-5"
                    styleClass="p-button-primary p-button-lg w-full"
                    (onClick)="onApprove()"
                  ></p-button>

                  <!-- Checkout -->
                  <ng-template #confirm>
                    <p-button
                      *ngIf="hasAllowance; else loading"
                      label="Confirm"
                      icon="fa-regular fa-check"
                      class="w-5"
                      styleClass="p-button-primary p-button-lg w-full"
                      [disabled]="!checkoutForm.valid"
                      (onClick)="onConfirm()"
                    ></p-button>
                  </ng-template>
                </div>
              </div>
            </ng-container>

            <!-- Loading Template -->
            <ng-template #loading>
              <dhb-loading></dhb-loading>
            </ng-template>
          </ng-container>
        </ng-container>

        <ng-template #message>
          <div *rxLet="process$ as process" class="text-center py-5 mb-4">
            <i [ngClass]="process.icon" class="text-4xl"></i>
            <br />
            <div class="mt-3 font-bold">{{ process.text }}</div>
            <ng-container *rxLet="isComplete$ as isComplete">
              <div class="mt-3 text-sm">
                {{
                  isComplete
                    ? 'Please get in touch via ' +
                      env.emails.shopSupport +
                      ' if you have any questions.'
                    : 'Please do not close this window.'
                }}
              </div>
              <p-button
                *ngIf="isComplete"
                label="Close"
                styleClass="p-button-secondary p-button-lg mt-4"
                (click)="ref.close()"
              ></p-button>
            </ng-container>
          </div>
        </ng-template>
      </ng-container>
    </ng-container>
  `,
  styles: [``],
  providers: [...provideDehubLoggerWithScope('Checkout Form')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit {
  productDetail$ = (
    this.config.data as { productDetail$: Observable<ProductCheckoutDetail> }
  ).productDetail$;

  account$ = this.moralisService.account$.pipe(filterNil());
  userContacts$ = this.dehubMoralis.userContacts$.pipe(
    tap(contacts => this.checkoutForm.controls.contacts.patchValue(contacts))
  );
  userShippingAddress$ = this.dehubMoralis.userShippingAddress$;

  hasAllowance$ = combineLatest([this.account$, this.productDetail$]).pipe(
    switchMap(([account, productDetail]) =>
      this.checkoutContractWithTokenMetadata$(productDetail.currency).pipe(
        withLatestFrom(of({ account, productDetail }))
      )
    ),
    tap(() => this.setProcMsg(CheckoutProcessMessage.AllowanceCheck)),
    switchMap(([[checkoutContract, metadata], { account, productDetail }]) =>
      this.moralisService
        .getTokenAllowance$({
          chain: decimalToHex(this.env.web3.chainId),
          owner_address: account,
          spender_address: checkoutContract.address,
          address: metadata.address,
        })
        .pipe(withLatestFrom(of({ metadata, productDetail, account })))
    ),
    // We check allowance for at least one item. If we have no allowance, we have to force infinite allowance approval.
    map(([{ allowance }, { metadata, productDetail, account }]) => {
      const hasEnoughBalance = this.parseUnits(
        allowance,
        metadata.decimals
      ).gte(this.parseUnits(productDetail.price.toString(), metadata.decimals));

      if (!hasEnoughBalance) {
        this.logger.warn(CheckoutMessage.LowBalance);
        this.messageService.add({
          severity: 'warn',
          summary: CheckoutMessage.LowBalance,
          detail: `Please, top up your '${shortenAddress(account)}' account.`,
          closable: true,
        });
      }

      return hasEnoughBalance;
    })
  );

  checkoutContract$ = this.dehubMoralis
    .getCheckoutContract$()
    .pipe(filterNil());

  private isProcessingSubject = new BehaviorSubject(false);
  isProcessing$ = this.isProcessingSubject.asObservable();

  private isCompleteSubject = new BehaviorSubject(false);
  isComplete$ = this.isCompleteSubject.asObservable();

  private parseUnits = Moralis.web3Library.utils.parseUnits;

  private processSubject = new BehaviorSubject<CheckoutProcess>({
    icon: 'fa-solid fa-circle-notch fa-spin',
    text: CheckoutProcessMessage.Confirm,
  });
  process$ = this.processSubject.asObservable();

  checkoutForm = this.fb.group({
    quantity: [1],
    contacts: this.fb.control<Contacts | null>(null, [Validators.required]),
    shippingAddress: this.fb.control<PhysicalAddress | null>(null, [
      Validators.required,
    ]),
  });

  totalAmount = 0;

  tokenMetadata$ = (currency: Currency) =>
    this.moralisService
      .getTokenMetadata$({
        chain: decimalToHex(this.env.web3.chainId),
        addresses: [
          getContractByCurrency(currency, this.env.web3.addresses.contracts),
        ],
      })
      .pipe(
        map(resp => resp[0]),
        publishReplayRefCount()
      );

  checkoutContractWithTokenMetadata$ = (currency: Currency) =>
    combineLatest([this.checkoutContract$, this.tokenMetadata$(currency)]);

  constructor(
    @Inject(MoralisToken) private moralisService: IMoralisService,
    @Inject(DehubMoralisToken) private dehubMoralis: IDehubMoralisService,
    @Inject(ContentfulManagementToken)
    private contentfulManagement: IContentFulManagementService,
    @Inject(EnvToken) public env: SharedEnv,
    @Inject(LoggerDehubToken) private logger: ILoggerService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private fb: NonNullableFormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  onApprove() {
    this.productDetail$
      .pipe(
        first(),
        switchMap(({ currency }) =>
          this.checkoutContractWithTokenMetadata$(currency)
        ),
        tap(() => {
          this.setProcMsg(CheckoutProcessMessage.AllowanceSet);
          this.isProcessingSubject.next(true);
        }),
        switchMap(([checkoutContract, metadata]) =>
          this.moralisService.setTokenAllowance$(
            metadata.address,
            checkoutContract.address
          )
        ),
        catchError(() => {
          this.isCompleteSubject.next(true);
          this.logger.error('Order failed during approval stage!');
          this.setProcMsg(CheckoutProcessMessage.ApprovalError);
          return of(undefined);
        }),
        finalize(() => this.isProcessingSubject.next(false))
      )
      .subscribe();
  }

  onConfirm() {
    const contacts = this.checkoutForm.controls.contacts.value;
    if (!contacts) {
      throw new Error('User contacts are missing!');
    }

    const shippingAddress = this.checkoutForm.controls.shippingAddress.value;
    if (!shippingAddress) {
      throw new Error('User shipping address is missing!');
    }
    const parseUnits = Moralis.web3Library.utils.parseUnits;

    const { email, phone } = contacts;

    this.isProcessingSubject.next(true);
    this.setProcMsg(CheckoutProcessMessage.UpdateContacts);

    // Update user contacts
    this.moralisService
      .updateUser$({ email, phone })
      .pipe(
        withLatestFrom(zip(this.account$, this.productDetail$)),
        map(
          ([, [account, productDetail]]) =>
            ({
              address: account,
              contentfulId: productDetail.contentfulId,
              productData: {
                name: productDetail.name,
                description: productDetail.description,
                image: productDetail.picture.url || '',
                sku: productDetail.sku,
                category: productDetail.category.name || '',
              },
              shippingAddress,
              quantity: this.checkoutForm.controls.quantity.value,
              totalAmount: this.totalAmount,
              currency: productDetail.currency,
            } as InitOrderParams)
        ),
        switchMap(params =>
          this.tokenMetadata$(params.currency).pipe(
            withLatestFrom(of({ params }))
          )
        ),

        // Check if we have enough balance
        tap(() => this.setProcMsg(CheckoutProcessMessage.BalanceCheck)),
        switchMap(([metadata, { params }]) =>
          this.dehubMoralis
            .hasEnoughBalance$(
              params.currency,
              params.address,
              parseUnits(params.totalAmount.toString(), metadata.decimals)
            )
            .pipe(withLatestFrom(of({ metadata, params })))
        ),
        filter(([hasEnoughBalance]) => hasEnoughBalance),

        // Init order will upload data to IPFS and store a record with status 'verifying' on Moralis.
        tap(() => this.setProcMsg(CheckoutProcessMessage.OrderInit)),
        switchMap(([, { metadata, params }]) =>
          this.dehubMoralis
            .initOrder$(params)
            .pipe(
              withLatestFrom(
                zip(this.checkoutContract$, of({ metadata, params }))
              )
            )
        ),

        // Mint the actual NFT with order ID and IPFS URI
        tap(() => this.setProcMsg(CheckoutProcessMessage.ReceiptMint)),
        switchMap(
          ([{ orderId, ipfsHash }, [checkoutContract, { metadata, params }]]) =>
            this.dehubMoralis
              .mintReceipt$(
                orderId,
                ipfsHash,
                checkoutContract,
                params.currency,
                parseUnits(params.totalAmount.toString(), metadata.decimals),
                BigNumber.from(params.quantity)
              )
              .pipe(withLatestFrom(of({ orderId, params })))
        ),

        // Keep checking the order status until it's verified.
        tap(() => this.setProcMsg(CheckoutProcessMessage.VerifyReceipt)),
        switchMap(([, { orderId, params }]) =>
          this.dehubMoralis.checkOrder$({ orderId }).pipe(
            repeatWhen(obs => obs.pipe(delay(1000))),
            filter(data => data.status !== OrderStatus.verified),
            first(),
            withLatestFrom(of({ params }))
          )
        ),

        // Decrease product quantity
        switchMap(([_order, { params }]) =>
          this.contentfulManagement.reduceProductAvailableQuantity$(
            params.contentfulId,
            params.quantity
          )
        ),
        tap(() => {
          this.setProcMsg(CheckoutProcessMessage.OrderSuccess);
          this.logger.info('Order completed!');
        }),
        first(),
        catchError(error => {
          this.logger.error('Order failed!', error);
          this.setProcMsg(CheckoutProcessMessage.OrderError);
          return of(undefined);
        }),
        finalize(() => this.isCompleteSubject.next(true))
      )
      .subscribe();
  }

  setProcMsg(msg: CheckoutProcessMessage) {
    const prc: CheckoutProcess = {
      icon: 'fa-solid fa-circle-notch fa-spin',
      text: msg,
    };
    switch (msg) {
      case CheckoutProcessMessage.OrderSuccess:
        this.processSubject.next({
          ...prc,
          icon: 'fa-duotone fa-circle-check',
        });
        break;
      case CheckoutProcessMessage.ApprovalError:
      case CheckoutProcessMessage.OrderError:
        this.processSubject.next({
          ...prc,
          icon: 'fa-duotone fa-circle-x',
        });
        break;
      default:
        this.processSubject.next(prc);
        break;
    }
  }

  isShippingAddressResponseEmpty(resp: DeHubShopShippingAddress) {
    return Object.keys(resp.attributes).length === 0;
  }

  calcTotalAmount(price: number, quantity: number) {
    this.totalAmount = price * quantity;
    return this.totalAmount;
  }
}
