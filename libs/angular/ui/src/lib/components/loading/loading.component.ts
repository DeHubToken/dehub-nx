import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'dhb-loading',
  template: ` <p><i [ngClass]="iconClass"></i>&nbsp;{{ title }}</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit {
  @Input() title = 'Loading...';
  @Input() iconClass = 'fa-solid fa-circle-notch fa-spin';

  ngOnInit() {}
}
