import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dhb-loader',
  template: `
    <div class="dhb-loader">
      <table>
        <tbody>
          <tr>
            <td>
              <!-- DeHub Loader -->
              <img [src]="loaderGif" width="180px" alt="DeHub Loader" />

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
  standalone: true,
  imports: [NgIf],
})
export class LoaderComponent implements OnInit {
  @Input() title = 'Waiting';
  @Input() subtitle?: string;
  @Input() loaderGif?: string;

  constructor() {}

  ngOnInit() {}
}
