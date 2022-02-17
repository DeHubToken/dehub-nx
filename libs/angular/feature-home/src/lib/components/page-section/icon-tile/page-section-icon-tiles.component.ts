import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PageSectionIconTilesFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-page-section-icon-tiles',
  template: `
    <div>
      {{ section.title }}
    </div>
    <div>
      {{ section.handpickedIconTilesCollection?.items?.length }}
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionIconTilesComponent implements OnInit {
  @Input() section!: PageSectionIconTilesFragment;

  constructor() {}

  ngOnInit() {}
}
