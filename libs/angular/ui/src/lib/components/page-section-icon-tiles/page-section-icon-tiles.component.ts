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
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-icon-tiles',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 sm:col-12 md:col-8 xl:col-8 col-offset-0 sm:col-offset-0 md:col-offset-2 xl:col-offset-2 flex flex-column mb-8"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Icon Tiles -->
      <div class="grid">
        <dhb-icon-tile
          *ngFor="let iconTile of iconTiles; let i = index"
          [iconTile]="iconTile"
          [@fadeInUp]="{ value: '', params: { delay: i + 1 * 100 } }"
          class="col-12 sm:col-12 md:col-6 xl:col-4 flex flex-auto"
        ></dhb-icon-tile>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
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
