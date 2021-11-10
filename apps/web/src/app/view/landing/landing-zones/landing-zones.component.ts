import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-landing-zones',
  template: ` <h2 class="col-12">Four zones. One platform.</h2> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingZonesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
