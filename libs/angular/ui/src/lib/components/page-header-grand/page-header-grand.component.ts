import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dhb-page-header-grand',
  template: ` <p>page-header-grand works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderGrandComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
