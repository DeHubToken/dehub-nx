import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-audits',
  template: `
    <p class="col-3 uppercase">Audits:</p>
    <span class="col-9">
      <!-- TechRate -->
      <a
        href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/Dehub%20Standart%20Smart%20Contract%20Security%20Audit%20(3).pdf"
        target="_blank"
        class="m-1"
      >
        <button
          pButton
          pRipple
          type="button"
          label="TechRate"
          class="button-rounded"
        ></button>
      </a>
      <!-- CertiK -->
      <a
        href="https://leaderboard.certik.io/projects/dehub"
        target="_blank"
        class="m-1"
      >
        <button
          pButton
          pRipple
          type="button"
          label="CertiK"
          class="button-rounded"
        ></button>
      </a>
    </span>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingAuditsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
