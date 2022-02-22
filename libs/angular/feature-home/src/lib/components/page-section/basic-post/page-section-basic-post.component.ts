import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BasicPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-page-section-basic-post',
  template: `
    <p-card
      *ngIf="basicPost"
      [dhbContentfulDraft]="basicPost.sys"
      header="{{ basicPost.title }}"
      subheader="{{
        basicPost.sys.publishedAt | date: 'EEE, MMM d, y, hh:mm:ss zzzz'
      }}"
      styleClass="p-card-shadow m-3"
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
        <p-button label="Read More" styleClass="p-button-link"></p-button>
      </ng-template>
    </p-card>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionBasicPostComponent implements OnInit {
  @Input() basicPost!: BasicPostFragment;

  constructor() {}

  ngOnInit() {}
}
