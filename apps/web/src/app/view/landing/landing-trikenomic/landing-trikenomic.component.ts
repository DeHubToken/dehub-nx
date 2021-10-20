import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-trikenomic',
  template: `
    <p>
      landing-trikenomic works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingTrikenomicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
