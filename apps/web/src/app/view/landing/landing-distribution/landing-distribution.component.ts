import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-distribution',
  template: `
    <p>
      landing-distribution works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingDistributionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
