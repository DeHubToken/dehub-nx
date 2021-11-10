import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-about',
  template: `
    <div class="col-6">
      <h2>Your portal to the Metaverse</h2>
    </div>

    <p class="col-6 text-3xl mt-4 mb-5 ">
      Blockchain’s first all-encompassing, highly-rewarding, ever-growing,
      lifestyle and entertainment aggregator. Watch, play, shop and earn in one
      ecosystem, powered by one token.
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingAboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
