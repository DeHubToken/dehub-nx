import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IMoralisService, MoralisToken } from '@dehub/angular/model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, take } from 'rxjs';

@Component({
  selector: 'dhb-connect-wallet',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisconnectWalletComponent implements OnInit {
  constructor(
    @Inject(MoralisToken) private moralisService: IMoralisService,
    private router: Router,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.moralisService.logout();

    this.router.events
      .pipe(
        filter(
          e =>
            e instanceof NavigationStart && e.navigationTrigger === 'popstate'
        ),
        take(1)
      )
      .subscribe(() => this.ref.close(true));
  }

  onReconnectClick() {
    this.ref.close(true);
    this.router.navigate(['/', { outlets: { modal: ['auth', 'connect'] } }], {
      queryParamsHandling: 'preserve',
    });
  }
}
