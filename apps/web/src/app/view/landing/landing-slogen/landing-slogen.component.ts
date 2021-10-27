import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-landing-slogen',
  template: `
    <div class="grid m-4">
      <div class="col-12">
        <div class="text-center">
          <img
            src="assets/dehub/icon-dehub-white.svg"
            alt="Dehub Icon"
            width="90px"
            class="m-4"
          />
        </div>
      </div>

      <div class="col-12 lg:col-4">
        <h2 class="text-center uppercase">Decentralised</h2>
      </div>

      <div class="col-12 lg:col-4">
        <h2 class="text-center uppercase">Entertainment</h2>
      </div>

      <div class="col-12 lg:col-4">
        <h2 class="text-center uppercase">Hub</h2>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingSlogenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
