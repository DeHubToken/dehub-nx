import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { DeHubConnectorNames } from '@dehub/shared/model';
import { fadeInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-connect-wallet-dialog',
  template: `
    <p-dialog
      [modal]="true"
      [draggable]="false"
      [header]="header"
      [(visible)]="visible"
      [style]="{ width: '350px' }"
      class="p-fluid"
    >
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
                  (click)="
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

      <!-- Walletconnect -->
      <div class="mt-2 mb-3">
        <dhb-wallet-button
          label="WalletConnect"
          [imageSources]="[path + '/assets/dehub/icons/walletconnect.svg']"
          (click)="login.emit({ connectorId: 'walletconnect' })"
        ></dhb-wallet-button>
      </div>
    </p-dialog>
  `,
  styles: [],
  animations: [
    fadeInRightOnEnterAnimation({ anchor: 'fadeInRight', duration: 500 }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletDialogComponent implements OnInit {
  @Input() header = 'Connect Wallet';
  @Input() visible = false;

  magicLinkForm!: FormGroup;

  path = this.env.baseUrl;

  @Output() login = new EventEmitter<{
    connectorId: DeHubConnectorNames;
    email?: string;
  }>();

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
