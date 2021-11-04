import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-about',
  template: `
    <p class="col-12">
      DeHub is blockchain's first entertainment aggregator and licensed producer
      of original motion picture, exclusive Pay-Per-View events, and surreal
      gaming experiences. This unified ecosystem is all fueled with $DEHUB
      tokens through open-source software and secured by cutting-edge blockchain
      technology.
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingAboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
