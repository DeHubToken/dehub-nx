import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { bounceInRightOnEnterAnimation } from 'angular-animations';

@Component({
  template: `
    <div class="grid">
      <p-button
        label="Back"
        [routerLink]="['/home']"
        styleClass="p-button-link p-mr-2"
      ></p-button>

      <h3 [@bounceInRight] class="col-12">{{ slug }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' })],
})
export class AngularFeatureNewsDetailComponent implements OnInit {
  slug?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? undefined;
  }
}
