import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-announcement',
  template: `
    <div class="mt-5 mb-6 text-center">
      <i class="fa-duotone fa-megaphone icon-color-duotone-1 text-6xl mt-4"></i>
      <h1>Important update</h1>
      <h3>
        Please refer to our
        <a href="https://t.me/Dehubannouncements/113">official announcement</a>
      </h3>
      <h5>TLDR;</h5>
      <p>
        We're upgrading the contract,
        <b>V3 comes with new tokenomics and everything else remains the same</b
        >.
      </p>
      <div>
        Private Liquidity generation event sold out in 2 days
        <i
          >(LGE is not a presale as all funds go into liquidity pools for
          traders)</i
        >.
      </div>
      <p>
        Open to all holders with <b>referral system</b> live on our marketplace
        giving you the
        <b>chance to earn a 10% bonus on purchases from referral</b>.
      </p>

      <p>
        Don't miss the public LGE on the 14th and refer to our announcement page
        starting at Announcement number 113
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent implements OnInit {
  ngOnInit() {}
}
