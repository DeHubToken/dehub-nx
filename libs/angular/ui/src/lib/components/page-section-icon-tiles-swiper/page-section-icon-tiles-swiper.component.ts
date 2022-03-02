import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  IconTileFragment,
  PageSectionIconTilesFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import {
  bounceInRightOnEnterAnimation,
  fadeInUpOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'dhb-page-section-icon-tiles-swiper',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@bounceInRight]
      class="col-12 mb-8"
    >
      <h3>{{ section.title }}</h3>
      <h5 class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal">
        {{ section.description }}
      </h5>

      <!-- Icon Tiles -->
      <swiper
        [navigation]="true"
        [breakpoints]="
          section.swiperResponsiveOptions || swiperResponsiveOptions
        "
      >
        <ng-container *ngFor="let iconTile of iconTiles">
          <ng-template swiperSlide>
            <dhb-icon-tile [iconTile]="iconTile" class="w-full"></dhb-icon-tile>
          </ng-template>
        </ng-container>
      </swiper>
    </div>
  `,
  styles: [
    `
      @import '~swiper/scss';
      @import '~@dehub/swiper/dhb_swiper_navigation';
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' }),
    fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' }),
  ],
})
export class PageSectionIconTilesSwiperComponent implements OnInit {
  @Input() section!: PageSectionIconTilesFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  iconTiles: IconTileFragment[] = [];

  constructor() {}

  ngOnInit() {
    this.iconTiles = (
      this.section.handpickedIconTilesCollection?.items ?? []
    ).filter(isNotNil);
  }
}
