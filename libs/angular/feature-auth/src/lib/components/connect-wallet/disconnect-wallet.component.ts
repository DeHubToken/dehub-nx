import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { IMoralisService, MoralisToken } from '@dehub/angular/model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbstractConnectWalletComponent } from './abstract-connect-wallet.component';

@Component({
  selector: 'dhb-disconnect-wallet',
  template: `
    <div class="text-center">
      <i class="fa-duotone fa-hand-wave icon-color-duotone-1 text-6xl mt-4"></i>
      <h6 class="mt-5 mb-6">
        Hope to see you back soon!
        <br />
        You are no longer connected.
      </h6>
      <div class="mb-8">
        <p-button
          [label]="'Reconnect Wallet'"
          [icon]="'fas fa-wallet'"
          (onClick)="onReconnectClick()"
        ></p-button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisconnectWalletComponent
  extends AbstractConnectWalletComponent
  implements OnInit
{
  constructor(
    @Inject(MoralisToken) private moralisService: IMoralisService,
    protected override router: Router,
    protected override dialogRef: DynamicDialogRef
  ) {
    super(router, dialogRef);
  }

  ngOnInit() {
    this.moralisService.logout();

    this.closeDialogOnBackNavigation();
  }

  onReconnectClick() {
    this.closeDialog(true);
    this.router.navigate(['/', { outlets: { modal: ['auth', 'connect'] } }], {
      queryParamsHandling: 'preserve',
    });
  }
}
