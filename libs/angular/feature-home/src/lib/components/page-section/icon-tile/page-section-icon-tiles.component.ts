import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  IconTileFragment,
  PageSectionIconTilesFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import {
  bounceInRightOnEnterAnimation,
  fadeInUpOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'dhb-page-section-icon-tiles',
  template: `
    <div class="grid">
      <div *ngIf="section">
        <h3 [@bounceInRight] class="col-12">{{ section.title }}</h3>

        <!-- Icon Tiles -->
        <div class="grid">
          <div
            *ngFor="let iconTile of iconTiles; let i = index"
            [@fadeInUp]="{ value: '', params: { delay: i * 100 } }"
            class="col-12 md:col-3"
          >
            <dhb-page-section-icon-tile
              [iconTile]="iconTile"
            ></dhb-page-section-icon-tile>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' }),
    fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' }),
  ],
})
export class PageSectionIconTilesComponent implements OnInit {
  @Input() section!: PageSectionIconTilesFragment;

  iconTiles: IconTileFragment[] = [];

  constructor() {}

  ngOnInit() {
    this.iconTiles = (
      this.section.handpickedIconTilesCollection?.items ?? []
    ).filter(isNotNil);
  }
}
