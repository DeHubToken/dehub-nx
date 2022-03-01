import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  template: `legal`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureLegalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
