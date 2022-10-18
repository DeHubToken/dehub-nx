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
  first,
  map,
  Observable,
  of,
  repeatWhen,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
  zip,
} from 'rxjs';
import {
  CheckoutMessage,
  CheckoutStatus,
  CheckoutStatusMessage,
} from '../model/checkout-form.model';

@Component({
  templateUrl: './checkout-form.component.html',
  providers: [...provideDehubLoggerWithScope('Checkout Form')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit {
  productDetail$ = (
    this.config.data as { productDetail$: Observable<ProductCheckoutDetail> }
  ).productDetail$;

  account$ = this.moralisService.account$.pipe(
    tap(account => {
      // Close popup if account disconnected
      if (!account) {
        this.ref.close();
      }
    }),
    filterNil()
  );
  userContacts$ = this.dehubMoralis.userContacts$;
  userShippingAddress$ = this.dehubMoralis.userShippingAddress$;

  checkoutContract$ = this.dehubMoralis
    .getCheckoutContract$()
    .pipe(filterNil());

  /** Represents an ongoing status, otherwise undefined */
  private statusSubject = new BehaviorSubject<CheckoutStatus | undefined>(
    undefined
  );

  private status$ = this.statusSubject.asObservable().pipe();

  private hasAllowance$ = combineLatest([
    this.account$,
    this.productDetail$.pipe(
      first(/** Quantity decrease trigger product, so we hide buying more */)
    ),
    // Allowance needs to be re-checked after approval
    this.status$.pipe(
      filterNil(),
      filter(({ text }) => text === CheckoutStatusMessage.AllowanceApproved),
      startWith(CheckoutStatusMessage.AllowanceApproved)
    ),
  ]).pipe(
    switchMap(([account, productDetail]) =>
      this.checkoutContractWithTokenMetadata$(productDetail.currency).pipe(
        withLatestFrom(of({ account, productDetail }))
      )
    ),
    tap(() => this.setStatus(CheckoutStatusMessage.AllowanceCheck)),
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
    }),
    tap(() => this.setStatus())
  );

  checkoutState$ = combineLatest([this.status$, this.hasAllowance$]).pipe(
    map(([status, hasAllowance]) => ({
      status,
      hasAllowance,
    }))
  );

  private parseUnits = Moralis.web3Library.utils.parseUnits;

  checkoutForm = this.fb.group({
    quantity: [1],
    contacts: this.fb.control<Contacts | null>(null, [Validators.required]),
    shippingAddress: this.fb.control<PhysicalAddress | null>(null),
    referralAddress: this.fb.control<string | undefined>(undefined),
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
    zip([this.checkoutContract$, this.tokenMetadata$(currency)]);

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
        tap(() => this.setStatus(CheckoutStatusMessage.AllowanceSet)),
        switchMap(([checkoutContract, metadata]) =>
          this.moralisService.setTokenAllowance$(
            metadata.address,
            checkoutContract.address
          )
        ),
        tap(() => this.setStatus(CheckoutStatusMessage.AllowanceApproved)),
        catchError(() => {
          this.setStatus(CheckoutStatusMessage.AllowanceApprovalError);
          return of(undefined);
        })
      )
      .subscribe();
  }

  onConfirm() {
    this.setStatus(CheckoutStatusMessage.Confirm);
    const contacts = this.checkoutForm.controls.contacts.value;
    if (!contacts) {
      throw new Error('User contacts are missing!');
    }

    const parseUnits = Moralis.web3Library.utils.parseUnits;

    const { email, phone } = contacts;

    this.setStatus(CheckoutStatusMessage.UpdateContacts);

    // Update user contacts
    this.moralisService
      .updateUser$({ email, phone })
      .pipe(
        withLatestFrom(zip(this.account$, this.productDetail$)),
        map(
          ([, [account, productDetail]]) =>
            ({
              address: account,
              referralAddress:
                this.checkoutForm.controls.referralAddress.value ?? undefined, // TODO: it should not be null by default due to non-nullable form builder
              shippingAddress:
                this.checkoutForm.controls.shippingAddress.value ?? undefined,
              contentfulId: productDetail.contentfulId,
              productData: {
                name: productDetail.name,
                description: productDetail.description,
                image: productDetail.picture.url || '',
                sku: productDetail.sku,
                category: productDetail.category.name || '',
              },
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
        tap(() => this.setStatus(CheckoutStatusMessage.BalanceCheck)),
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
        tap(() => this.setStatus(CheckoutStatusMessage.OrderInit)),
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
        tap(() => this.setStatus(CheckoutStatusMessage.ReceiptMint)),
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
        tap(() => this.setStatus(CheckoutStatusMessage.VerifyReceipt)),
        switchMap(([, { orderId, params }]) =>
          this.dehubMoralis.checkOrder$({ orderId }).pipe(
            repeatWhen(obs => obs.pipe(delay(1000))),
            filter(data => data.status !== OrderStatus.verified),
            first(),
            withLatestFrom(of({ params }))
          )
        ),

        // Decrease product quantity
        switchMap(([_orderStatus, { params }]) =>
          this.contentfulManagement.reduceProductAvailableQuantity$(
            params.contentfulId,
            params.quantity
          )
        ),
        tap(() => this.setStatus(CheckoutStatusMessage.OrderSuccess)),
        first(),
        catchError(error => {
          this.setStatus(CheckoutStatusMessage.OrderError, error);
          return of(undefined);
        })
      )
      .subscribe();
  }

  setStatus(msg?: CheckoutStatusMessage, error?: Error) {
    if (!msg) {
      this.statusSubject.next(undefined);
      return;
    }

    const status: CheckoutStatus = {
      icon: 'fa-solid fa-circle-notch fa-spin',
      text: msg,
      isCompleted: false,
    };
    switch (msg) {
      case CheckoutStatusMessage.OrderSuccess:
        this.statusSubject.next({
          ...status,
          icon: 'fa-duotone fa-circle-check',
          isCompleted: true,
        });
        this.logger.info(status.text);
        break;
      case CheckoutStatusMessage.AllowanceApprovalError:
      case CheckoutStatusMessage.OrderError:
        this.statusSubject.next({
          ...status,
          icon: 'fa-duotone fa-circle-x',
          isCompleted: true,
        });
        this.logger.error(status.text, error);
        break;
      default:
        this.statusSubject.next(status);
        this.logger.info(status.text);
        break;
    }
  }

  calcTotalAmount(price: number, quantity: number) {
    this.totalAmount = price * quantity;
    return this.totalAmount;
  }
}
