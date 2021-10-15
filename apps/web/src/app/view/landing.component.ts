import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="grid">
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

      <div class="col-4">
        <div class="text-center">DECENTRALIZED</div>
      </div>

      <div class="col-4">
        <div class="text-center">ENTERTAINMENT</div>
      </div>

      <div class="col-4">
        <div class="text-center">HUB</div>
      </div>
    </div>
  `,
  styles: [``],
})
export class LandingComponent implements OnInit {
  ngOnInit() {}
}
