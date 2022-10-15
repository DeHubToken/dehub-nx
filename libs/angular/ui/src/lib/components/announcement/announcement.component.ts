import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-announcement',
  template: `
    <div class="mt-5 mb-6 text-center">
      <i class="fa-duotone fa-megaphone icon-color-duotone-1 text-6xl mt-4"></i>
      <h1>Important update</h1>
      <p>
        The public LGE is commencing with pre-orders for those that simply
        cannot wait or attend a later date.
      </p>
      <p>
        You can now send your required amount to<b
          >0xdeaab569baDB5fD2d491DE97B1D7a36D4F43B31A</b
        >
        to secure your spot.
      </p>
      <p>Totals will be updated on listings when public LGE launches.</p>
      <p>
        There are a <b>number of factors delaying the full public LGE</b> for us
        including:
      </p>
      <ol class="text-left line-height-4">
        <li>
          New contract audit now required prior to listing on CEXs<i>
            (Certik update in the works, 2-3 week turnaround estimated)</i
          >
        </li>
        <li>
          10+ people everyday are reaching out across email, socials and groups
          unaware of the changes and asking how to get involved
        </li>
        <li>
          Took us longer than expected to schedule in our marketing plans as we
          were only interested in settling for the best, such as
          <a
            href="https://www.youtube.com/c/altcoindaily"
            target="_blank"
            aria-label="Altcoin Daily"
            >Altcoin Daily</a
          >
        </li>
        <li>
          Nobody in the community has complained or moaned about delays or taken
          our offer to sell OTC at current LGE prices. You have given us your
          trust and patience so we owe you the best of our abilities meaning we
          don't need to rush or cut any corners
        </li>
        <li>
          Minor bug on the marketplace check out flow picked up in the private
          LGE also being resolved
        </li>
      </ol>
      <p>
        So we will set a <b>new soft date for the LGE on October 29th</b>,
        meaning nothing will happen before then and you can set a date in your
        calendars to keep up with major developments.
      </p>
      <p>Refer to our website or socials for more.</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent implements OnInit {
  ngOnInit() {}
}
