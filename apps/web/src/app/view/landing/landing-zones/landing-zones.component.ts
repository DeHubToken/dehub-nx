import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-zones',
  template: `
    <p>
      landing-zones works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingZonesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
