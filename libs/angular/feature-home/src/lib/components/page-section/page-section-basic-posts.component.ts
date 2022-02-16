import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PageSectionBasicPostsFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-page-section-basic-posts',
  template: `
    <div>
      {{ section.title }}
    </div>
    <div>
      {{ section.handpickedPostsCollection?.items?.length }}
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionBasicPostsComponent implements OnInit {
  @Input() section!: PageSectionBasicPostsFragment;

  constructor() {}

  ngOnInit() {}
}
