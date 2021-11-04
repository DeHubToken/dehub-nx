import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-youtube',
  template: `
    <img
      src="/assets/landing/meta-cover.jpg"
      class="max-w-full h-auto border-solid border-4"
    />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingYoutubeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
