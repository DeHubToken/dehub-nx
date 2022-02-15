import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  template: `
    <div class="grid">
      <div [@bounceInLeft] class="col-12">
        <h3>Welcome to DeHub</h3>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
