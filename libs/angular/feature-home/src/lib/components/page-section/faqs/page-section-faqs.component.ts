import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PageSectionFaQsFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-page-section-faqs',
  template: `
    <div>
      {{ section.title }}
    </div>
    <div>
      {{ section.handpickedFaqGroupsCollection?.items?.length }}
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionFaQsComponent implements OnInit {
  @Input() section!: PageSectionFaQsFragment;

  constructor() {}

  ngOnInit() {}
}
