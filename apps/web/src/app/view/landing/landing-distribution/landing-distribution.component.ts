import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chart.js/index.d.ts
import { ChartData, ChartOptions } from 'chart.js';
@Component({
  selector: 'dhb-landing-distribution',
  template: `
    <h2 class="col-12">Total Supply 8,000,000,000</h2>
    <h2 class="col-12">$DeHub Final Supply 1,000,000,000 $DeHub</h2>

    <div class="grid">
      <div class="col-12 md:col-6">
        <h4 class="uppercase">Presale + Liquidity Pool</h4>
        <p>
          34% of the total supply is allocated to presale and liquidity pool.
          Private sale rate: 0.001$ / DeHub Launchpad rate: 0.00135$ / DeHub
          Listing rate: 0.0015$ / DeHub Note: LP locked for 3 years.
        </p>
      </div>
      <div class="col-12 md:col-6">
        <h4 class="uppercase">Burned Wallet</h4>
        <p>
          The DeHub Burned Wallet will receive its share from the 1% reflections
          in a process that slowly removes tokens from circulation thus
          increasing the value of the remaining tokens.
        </p>
      </div>

      <!-- Pie Chart -->
      <div class="col-12 flex justify-content-center">
        <p-chart
          type="doughnut"
          [data]="chartData"
          [options]="chartOptions"
          [style]="{ width: chartWidth }"
        ></p-chart>
      </div>

      <div class="col-12 md:col-6">
        <h4 class="uppercase">Team Wallet</h4>
        <p>
          The DeHub Team Wallet contains funds reserved for founders who
          initially funded and started the project. No wallet can sell below
          their percentage allocation and only the reflections will be tradable
          for the first 4 years.
        </p>
      </div>
      <div class="col-12 md:col-6">
        <h4 class="uppercase">Operations & Marketing Wallet</h4>
        <p>
          8% of the total supply will be allocated to fund the following: 1-
          Marketing: Ongoing marketing campaigns, influencers and in-house
          marketing experts, social media moderators and designers. 2- Research
          & Development: Ongoing updates to the website and D’app including a
          schedule of enhancements to the user experience via new features to be
          launched on a monthly basis. 3- Partnerships and Licensing: Secure the
          biggest and best releases and rights such as major MMA and Boxing
          events.
        </p>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingDistributionComponent implements OnInit {
  chartData?: ChartData;
  chartOptions?: ChartOptions;
  chartWidth = '40%';
  constructor() {}

  ngOnInit(): void {
    this.chartData = {
      labels: ['Burned', 'Presale & LP', 'Operations', 'Team'],
      datasets: [
        {
          data: [50, 34, 8, 8],
          backgroundColor: [
            'rgb(100, 90, 189)',
            'rgb(151, 37, 149)',
            'rgb(156, 82, 217)',
            'rgb(118, 93, 222)',
          ],
          rotation: 180,
          borderWidth: 1,
        },
      ],
    };
    this.chartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }
}
