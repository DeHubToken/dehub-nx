import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  template: `
    <div class="grid">
      <div [@fadeInUp] class="col-12 text-center mt-8">
        <h1 class="bold uppercase text-8xl">Coming Soon</h1>
        <h5>( no countdown 😅 )</h5>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class AngularFeatureShopComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
