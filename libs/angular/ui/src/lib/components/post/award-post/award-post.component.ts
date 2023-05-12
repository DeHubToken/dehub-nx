import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AwardPostFragment } from '@dehub/shared/model';
import { HeavyPictureComponent } from '../../heavy-picture/heavy-picture.component';

import { NgIf, NgOptimizedImage } from '@angular/common';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-award-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgOptimizedImage,
    // UI
    ContentfulDraftDirective,
    HeavyPictureComponent,
  ],
  template: `
    <div [dhbContentfulDraft]="awardPost.sys">
      <ng-container *ngIf="awardPost.link as link">
        <a [href]="link" target="_blank" rel="noreferrer">
          <ng-container *ngIf="awardPost.picture as award">
            <img
              [ngSrc]="award.webpUrlWithRadius!"
              [width]="award.width"
              [height]="award.height"
              [alt]="award.description ?? award.title"
              sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
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

  constructor() {}

  ngOnInit() {}
}
