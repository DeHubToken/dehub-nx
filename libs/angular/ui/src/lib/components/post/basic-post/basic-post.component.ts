import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicPostFragment } from '@dehub/shared/model';
import { ButtonModule } from 'primeng/button';

import { NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-basic-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    RouterLink,
    NgOptimizedImage,
    // PrimeNG
    CardModule,
    ButtonModule,
    // UI
    ContentfulDraftDirective,
  ],
  template: `
    <div [dhbContentfulDraft]="basicPost.sys">
      <p-card
        *ngIf="basicPost"
        [header]="basicPost.title ?? ''"
        styleClass="p-card-shadow h-full"
      >
        <ng-template pTemplate="header">
          <ng-container *ngIf="basicPost.mainPicture as mainPicture">
            <img
              *ngIf="mainPicture.url"
              [dhbContentfulDraft]="mainPicture.sys"
              [ngSrc]="mainPicture.url"
              [width]="mainPicture.width"
              [height]="mainPicture.height"
              [alt]="mainPicture.description || mainPicture.title"
              sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
              class="h-auto"
            />
          </ng-container>
        </ng-template>
        <p>
          {{ basicPost.summary }}
        </p>
        <ng-template pTemplate="footer">
          <p-button
            [routerLink]="['/news/' + basicPost.slug]"
            label="Read More"
            styleClass="p-button-secondary"
          ></p-button>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      /* Important for keeping all items stretched to same height */
      :host {
        height: 100%;
        & > div {
          height: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPostComponent implements OnInit {
  @Input() basicPost!: BasicPostFragment;

  constructor() {}

  ngOnInit() {}
}
