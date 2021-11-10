import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-landing-audits',
  template: `
    <div class="col-12 flex align-items-center mt-4 mb-5">
      <p class="uppercase bold  mr-4 mb-2">Audits:</p>

      <!-- TechRate -->
      <a
        href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/Dehub%20Standart%20Smart%20Contract%20Security%20Audit%20(3).pdf"
        target="_blank"
        class="pr-3"
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
        class=""
      >
        <button
          pButton
          pRipple
          type="button"
          label="CertiK"
          class="button-rounded"
        ></button>
      </a>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingAuditsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
