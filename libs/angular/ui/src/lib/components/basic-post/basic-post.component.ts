import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BasicPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-basic-post',
  template: `
    <div [dhbContentfulDraft]="basicPost.sys">
      <p-card
        *ngIf="basicPost"
        [header]="basicPost.title ?? ''"
        [subheader]="(basicPost.sys.publishedAt | date: 'fullDate')!"
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
      :host {
        display: flex;
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
