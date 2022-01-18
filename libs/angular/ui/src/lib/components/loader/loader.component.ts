import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { MoralisService } from '@dehub/angular/moralis';
import { SharedEnv } from '@dehub/shared/config';
import { WalletConnectingState } from '@dehub/shared/moralis';
import { AnimationOptions } from 'ngx-lottie';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'dhb-loader',
  template: `
    <div *ngIf="visible$ | async" class="dhb-loader">
      <table>
        <tbody>
          <tr>
            <td>
              <!-- DeHub Lottie -->
              <ng-lottie
                [options]="options"
                [styles]="styles"
                width="180px"
                containerClass="pt-2 mx-auto"
              ></ng-lottie>

              <!-- Title -->
              <h4 class="dhb-loader-title">Waiting</h4>

              <!-- Subtitle -->
              <div class="dhb-loader-subtitle">{{ subtitle$ | async }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  private subtitkeSubject = new BehaviorSubject<string>('');
  subtitle$ = this.subtitkeSubject.asObservable();

  options: AnimationOptions = {};
  styles: Partial<CSSStyleDeclaration> = {};

  visible$ = this.moralisService.walletConnectingState$.pipe(
    tap(walletConnectingState => {
      let subtitle = '';
      switch (walletConnectingState) {
        case WalletConnectingState.SWITCH_NETWORK:
          subtitle = 'Please confirm network switch with your wallet.';
          break;
        case WalletConnectingState.ADD_NETWORK:
          subtitle = 'Please confirm network switch with your wallet.';
          break;
        default:
          subtitle = 'Please confirm with your wallet.';
      }
      this.subtitkeSubject.next(subtitle);
    }),
    map(
      walletConnectingState =>
        ![WalletConnectingState.INIT, WalletConnectingState.COMPLETE].includes(
          walletConnectingState
        )
    )
  );

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private moralisService: MoralisService
  ) {}

  ngOnInit() {
    this.options = {
      path: `${this.env.baseUrl}/assets/dehub/dehub-loader-light-blue.json`,
    };
    this.styles = {
      background: 'transparent',
      height: 'fit-content',
    };
  }
}
