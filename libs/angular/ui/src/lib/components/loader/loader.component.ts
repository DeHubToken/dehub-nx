import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'dhb-loader',
  template: `
    <div class="dhb-loader">
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
              <h4 class="dhb-loader-title">{{ title }}</h4>

              <!-- Subtitle -->
              <div class="dhb-loader-subtitle">{{ subtitle }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  @Input() title = 'Loading...';
  @Input() subtitle = 'Please wait';

  options: AnimationOptions = {};
  styles: Partial<CSSStyleDeclaration> = {};

  constructor(@Inject(EnvToken) private env: SharedEnv) {}

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
