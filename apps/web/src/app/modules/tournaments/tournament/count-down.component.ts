import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'dhb-count-down',
  template: ` <i [class]="icon"></i> {{ remaining$ | async }} `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountDownComponent implements OnInit {
  @Input() countDownDateStr = new Date().toDateString();
  @Input() icon = 'fa fa-clock';

  remaining$?: Observable<string>;

  ngOnInit() {
    this.remaining$ = interval(1000).pipe(
      map(
        // Find the distance between now and the count down date
        () => new Date(this.countDownDateStr).getTime() - new Date().getTime()
      ),
      takeWhile(distance => distance > 0),
      map(distance => {
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${days} day(s) ${hours} hours ${minutes} minutes ${seconds} seconds`;
      })
    );
  }
}
