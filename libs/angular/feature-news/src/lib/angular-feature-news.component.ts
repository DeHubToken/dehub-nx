import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  template: `news`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureNewsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
