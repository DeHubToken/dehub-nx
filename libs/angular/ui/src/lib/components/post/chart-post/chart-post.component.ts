import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartPostFragment } from '@dehub/shared/model';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'dhb-chart-post',
  standalone: true,
  imports: [
    // PrimeNG
    ChartModule,
  ],
  template: `
    <div class="px-5 pt-6 pb-7">
      <p-chart
        [type]="chartPost.chartType!"
        [data]="chartData"
        [options]="chartOptions"
        [style]="{ width: chartWidth }"
      />
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPostComponent implements OnInit {
  @Input() chartPost!: ChartPostFragment;
  chartData?: ChartData;
  chartOptions?: ChartOptions;
  chartWidth = '100%';

  constructor() {}

  ngOnInit() {
    // Shallow clone to avoid using non extensible object.
    this.chartData = { ...this.chartPost.chartData };
    this.chartOptions = { ...this.chartPost.chartOptions };
  }
}
