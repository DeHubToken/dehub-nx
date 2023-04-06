import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'dhb-loading',
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
  standalone: true,
  imports: [NgClass],
})
export class LoadingComponent implements OnInit {
  @Input() title = 'Loading...';
  @Input() iconClass = 'fa-solid fa-circle-notch fa-spin';

  ngOnInit() {}
}
