import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AwardPostFragment } from '@dehub/shared/model';

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
              [priority]="priority"
              [alt]="award.description ?? award.title"
              class="w-6 md:w-9 h-auto anim-hover-1-reverse"
              sizes="(max-width: 576px) 15vw, 100vw"
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
  @Input() priority = false;

  constructor() {}

  ngOnInit() {}
}
