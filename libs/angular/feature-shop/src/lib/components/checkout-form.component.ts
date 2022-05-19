import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  template: ` <div>It works!</div> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
