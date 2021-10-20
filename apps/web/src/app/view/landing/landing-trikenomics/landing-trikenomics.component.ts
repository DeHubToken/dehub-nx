import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-trikenomics',
  template: `
    <p>
      landing-trikenomics works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingTrikenomicsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
