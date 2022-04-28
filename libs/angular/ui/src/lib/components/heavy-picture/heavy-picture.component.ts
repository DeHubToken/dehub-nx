import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

interface ContentfulPicture {
  __typename?: string;
  title?: string;
  url?: string;
  sys: { __typename?: 'Sys' };
}

@Component({
  selector: 'dhb-heavy-picture',
  template: `
    <img
      *ngIf="container.picture as picture"
      [dhbContentfulDraft]="picture.sys"
      [src]="picture.url"
      [alt]="picture.title"
      [ngClass]="{
        hidden: heavyPictureLoaded
      }"
    />
    <ng-container *ngIf="container.heavyPicture as heavyPicture">
      <img
        [dhbContentfulDraft]="heavyPicture.sys"
        [src]="heavyPicture.url"
        [alt]="heavyPicture.title"
        [ngClass]="{
          hidden: !heavyPictureLoaded
        }"
        (load)="heavyPictureLoaded = true"
      />
    </ng-container>
  `,
  styles: [
    `
      img {
        vertical-align: middle;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeavyPictureComponent<
  C extends {
    picture?: ContentfulPicture;
    heavyPicture?: ContentfulPicture;
  }
> implements OnInit
{
  @Input() container!: C;
  heavyPictureLoaded = false;

  constructor() {}

  ngOnInit() {}
}
