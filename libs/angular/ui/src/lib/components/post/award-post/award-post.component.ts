import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AwardPostFragment } from '@dehub/shared/model';

import { NgIf, NgOptimizedImage } from '@angular/common';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { ContentfulImageAltPipe } from '../../../pipes/contentful-image-alt/contentful-image-alt.pipe';

@Component({
  selector: 'dhb-award-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgOptimizedImage,
    // UI
    ContentfulDraftDirective,
    ContentfulImageAltPipe,
  ],
  template: `
    <div [dhbContentfulDraft]="awardPost.sys">
      <ng-container *ngIf="awardPost.link as link">
        <a [href]="link" target="_blank" rel="noreferrer">
          <ng-container *ngIf="awardPost.picture as award">
            <img
              *ngIf="award.url"
              [ngSrc]="award.url"
              [loaderParams]="{ cornerRadius: 1000 }"
              [width]="award.width"
              [height]="award.height"
              [priority]="priority"
              [alt]="award | dhbContentfulImageAlt"
              sizes="(max-width: 750px) 30vw, 10vw"
              class="w-6 md:w-9 h-auto anim-hover-1-reverse"
            />
          </ng-container>
        </a>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwardPostComponent implements OnInit {
  @Input() awardPost!: AwardPostFragment;
  @Input({ required: true }) priority = false;

  constructor() {}

  ngOnInit() {}
}
