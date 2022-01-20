import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
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
                *ngIf="lottieJson"
                [options]="lottieOptions"
                [styles]="lottieStyles"
                width="180px"
                containerClass="pt-2 mx-auto"
              ></ng-lottie>

              <!-- Title -->
              <h4 *ngIf="subtitle" class="dhb-loader-title">{{ title }}</h4>

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
  @Input() title = 'Waiting';
  @Input() subtitle?: string;
  @Input() lottieJson?: string;

  lottieOptions: AnimationOptions = {};
  lottieStyles: Partial<CSSStyleDeclaration> = {};

  constructor() {}

  ngOnInit() {
    if (this.lottieJson) {
      this.lottieOptions = {
        path: this.lottieJson,
      };

      this.lottieStyles = {
        background: 'transparent',
        height: 'fit-content',
      };
    }
  }
}
