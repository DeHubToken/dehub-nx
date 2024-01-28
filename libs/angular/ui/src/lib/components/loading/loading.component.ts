import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'dhb-loading',
  standalone: true,
  imports: [
    // Angular
    NgClass,
  ],
  template: ` <p><i [ngClass]="iconClass"></i>&nbsp;{{ title }}</p> `,
  styles: [
    `
      p {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit {
  @Input() title = 'Loading...';
  @Input() iconClass = 'fa-solid fa-circle-notch fa-spin';

  ngOnInit() {}
}
