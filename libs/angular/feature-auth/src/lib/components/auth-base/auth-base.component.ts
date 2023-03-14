import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, take } from 'rxjs';

@Component({
  selector: 'dhb-auth-base',
  template: `
    <div class="text-center">
      <i
        class="fa-duotone fa-key-skeleton-left-right icon-color-duotone-1 text-6xl mt-4"
      ></i>
      <h6 class="mt-5 mb-6">
        To continue, you have to connect your wallet first.
      </h6>
      <div class="mb-8">
        <p-button
          [label]="'Connect Wallet'"
          [icon]="'fas fa-wallet'"
          (onClick)="onConnectClick()"
        ></p-button>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthBaseComponent implements OnInit {
  chainId = this.env.web3.chainId;
  magicLinkApiKey = this.env.web3.auth.magicLinkApiKey;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private router: Router,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          e =>
            e instanceof NavigationStart && e.navigationTrigger === 'popstate'
        ),
        take(1)
      )
      // Ignore "nextUrl" as it is a base component and going back should just close the modal
      .subscribe(() => this.ref.close());
  }

  onConnectClick() {
    // Pass "true", to honor "nextUrl"
    this.ref.close(true);
    this.router.navigate(['/', { outlets: { modal: ['auth', 'connect'] } }], {
      queryParamsHandling: 'preserve',
    });
  }
}
