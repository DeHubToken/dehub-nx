import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-zone',
  template: `
    <p>
      landing-zone works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingZoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
