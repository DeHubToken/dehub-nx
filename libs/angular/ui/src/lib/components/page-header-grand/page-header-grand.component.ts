import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-page-header-grand',
  template: `
    <!-- Responsive element pushing down all the section bellow -->
    <div class="content">
      <!-- Contains all the content -->
      <div class="hero col-12 md:col- lg:col-8 absolute bottom-0 mb-8">
        <h1 class="text-3xl lg:text-7xl font-bold font-italic uppercase">
          Way of the Warrior
        </h1>
        <p class="text-base lg:text-xl pl-2">
          Our first ever original and blockchains first all token funded
          original motion picture production.
        </p>
        <div class="buttons pt-4 pl-2">
          <p-button
            label="Play"
            icon="fa-light fa-play text-base lg:text-3xl pr-2"
            styleClass="p-button-lg text-base lg:text-3xl uppercase font-bold pl-5 pr-6 py-3 mr-3 bg-gradient-4 border-neon-1 transition-colors transition-duration-500 hover:bg-purple-800"
          ></p-button>
          <p-button
            label="More Info"
            styleClass="p-button-lg text-base lg:text-3xl uppercase font-bold px-5 py-3 bg-gradient-5 border-neon-1 transition-colors transition-duration-500 hover:bg-purple-800"
          ></p-button>
        </div>
      </div>
    </div>
    <!-- Absolute full width, top 0 responsive element -->
    <div class="billboard">
      <div class="overlay"></div>
      <!-- Loaded before trailer -->
      <img class="static-image" src="/assets/dehub/images/phg-test.jpg" />
      <!-- Load in bg and replace the static image -->
      <!-- Once the trailer finishes playing, replace back with static image -->
      <div class="motion">
        <div class="player-container"></div>
      </div>
    </div>
  `,
  styleUrls: ['./page-header-grand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderGrandComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
