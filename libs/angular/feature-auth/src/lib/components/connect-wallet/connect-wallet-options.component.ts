import { NgIf, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EnvToken } from '@dehub/angular/model';
import { WalletButtonComponent } from '@dehub/angular/ui/components/buttons/wallet-button/wallet-button.component';
import {
  DeHubConnector,
  SharedEnv,
  WalletConnectState,
  WalletConnectingState,
} from '@dehub/shared/model';
import {
  fadeInRightOnEnterAnimation,
  fadeInUpOnEnterAnimation,
} from 'angular-animations';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'dhb-connect-wallet-options',
  template: `
    <div *ngIf="walletConnectState" class="p-fluid">
      <!-- Metamask -->
      <div class="mt-2 mb-3">
        <dhb-wallet-button
          label="Browser Wallet"
          [imageSources]="[
            path + '/assets/dehub/icons/metamask.svg',
            path + '/assets/dehub/icons/trustwallet.svg'
          ]"
          (click)="login.emit({ connectorId: 'metamask' })"
        ></dhb-wallet-button>
        <div
          *ngIf="
            walletConnectState &&
            walletConnectState.connectorId === 'metamask' &&
            walletConnectState.state === walletConnectingState.NO_PROVIDER
          "
          [@fadeInUp]
          class="m-2"
        >
          Please install or reload&nbsp;
          <a href="https://metamask.io/" target="_blank" rel="noreferrer">
            MetaMask </a
          >&nbsp;extension on your browser.
        </div>
      </div>

      <!-- Magic Link -->
      <div [formGroup]="magicLinkForm" class="mt-2 mb-3">
        <p-inplace #inplaceMagic [preventClick]="true">
          <!-- Display Template -->
          <ng-template pTemplate="display">
            <dhb-wallet-button
              label="Magic"
              [imageSources]="[path + '/assets/dehub/icons/magic.svg']"
              (click)="inplaceMagic.activate()"
            ></dhb-wallet-button>
          </ng-template>

          <!-- Content -->
          <ng-template pTemplate="content">
            <div [@fadeInRight] class="grid">
              <!-- Magic Email -->
              <div class="col-8">
                <input
                  type="email"
                  pInputText
                  formControlName="email"
                  placeholder="Magic email"
                  required
                />
              </div>

              <!-- Magic Login -->
              <div class="col-4">
                <p-button
                  (onClick)="
                    inplaceMagic.deactivate();
                    login.emit({
                      connectorId: 'magicLink',
                      email: magicLinkForm.get('email')?.value
                    })
                  "
                  [disabled]="magicLinkForm.invalid"
                >
                  <img
                    alt="Magic"
                    [src]="path + '/assets/dehub/icons/magic.svg'"
                    [ngStyle]="{
                      width: '32px',
                      height: '16px',
                      paddingRight: '10px'
                    }"
                  />
                  Login
                </p-button>
              </div>
            </div>
          </ng-template>
        </p-inplace>
      </div>

      <!-- Trust Wallet (visible on Mobile only) -->
      <div class="mt-2 mb-3 md:hidden">
        <dhb-wallet-button
          label="Trust Wallet"
          [imageSources]="[path + '/assets/dehub/icons/trustwallet.svg']"
          (click)="login.emit({ connectorId: 'metamask' })"
        ></dhb-wallet-button>
      </div>

      <!-- Wallet Connect -->
      <div class="mt-2 mb-3">
        <dhb-wallet-button
          label="WalletConnect"
          [imageSources]="[path + '/assets/dehub/icons/walletconnect.svg']"
          (click)="login.emit({ connectorId: 'walletconnect' })"
        ></dhb-wallet-button>
      </div>

      <!-- Binance -->
      <div class="mt-2 mb-3">
        <dhb-wallet-button
          label="Binance"
          [imageSources]="[path + '/assets/dehub/icons/bsc.svg']"
          (click)="login.emit({ connectorId: 'binance' })"
        ></dhb-wallet-button>
        <div
          *ngIf="
            walletConnectState &&
            walletConnectState.connectorId === 'binance' &&
            walletConnectState.state === walletConnectingState.NO_PROVIDER
          "
          [@fadeInUp]
          class="m-2"
        >
          Please install&nbsp;
          <a
            href="https://docs.binance.org/smart-chain/wallet/binance.html"
            target="_blank"
            rel="noreferrer"
          >
            Binance Wallet </a
          >&nbsp;extension on your browser.
        </div>
      </div>
    </div>
  `,
  styles: [],
  animations: [
    fadeInRightOnEnterAnimation({ anchor: 'fadeInRight', duration: 500 }),
    fadeInUpOnEnterAnimation({ anchor: 'fadeInUp', duration: 500 }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    WalletButtonComponent,
    ReactiveFormsModule,
    InplaceModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    NgStyle,
  ],
})
export class ConnectWalletOptionsComponent implements OnInit {
  @Input() walletConnectState?: WalletConnectState;

  magicLinkForm!: FormGroup;

  path = this.env.baseUrl;

  walletConnectingState = WalletConnectingState;

  @Output() login = new EventEmitter<DeHubConnector>();

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.magicLinkForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
