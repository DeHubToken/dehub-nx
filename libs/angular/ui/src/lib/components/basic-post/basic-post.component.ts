import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BasicPostFragment } from '@dehub/shared/model';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';

@Component({
    selector: 'dhb-basic-post',
    template: `
    <div [dhbContentfulDraft]="basicPost.sys">
      <p-card
        *ngIf="basicPost"
        [header]="basicPost.title ?? ''"
        styleClass="p-card-shadow h-full"
      >
        <ng-template pTemplate="header">
          <img
            *ngIf="basicPost.mainPicture as mainPicture"
            [dhbContentfulDraft]="mainPicture.sys"
            [src]="mainPicture.url"
            [alt]="mainPicture.title"
          />
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
    standalone: true,
    imports: [ContentfulDraftDirective, NgIf, CardModule, SharedModule, ButtonModule, RouterLink]
})
export class BasicPostComponent implements OnInit {
  @Input() basicPost!: BasicPostFragment;

  constructor() {}

  ngOnInit() {}
}
