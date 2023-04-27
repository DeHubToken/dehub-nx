import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SysFragment } from '@dehub/shared/model';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';

// TODO: is there any generated GQL type?
interface ContentfulPicture {
  __typename?: string;
  title?: string;
  url?: string;
  sys: SysFragment;
}

@Component({
  selector: 'dhb-heavy-picture',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgClass,
    // UI
    ContentfulDraftDirective,
  ],
  template: `
    <span (mouseover)="onMouseOver()" (mouseout)="onMouseOut()">
      <img
        *ngIf="container.picture as picture"
        [dhbContentfulDraft]="picture.sys"
        [src]="picture.url"
        [alt]="picture.title"
        [ngClass]="{
          hidden: showHeavyPic
        }"
      />
      <ng-container *ngIf="container.heavyPicture as heavyPicture">
        <img
          [dhbContentfulDraft]="heavyPicture.sys"
          [src]="heavyPicture.url"
          [alt]="heavyPicture.title"
          [ngClass]="{
            hidden: !showHeavyPic
          }"
          (load)="onLoad()"
        />
      </ng-container>
    </span>
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
    showHeavyPictureOnHover?: boolean;
  }
> implements OnInit
{
  @Input() container!: C;
  @Input() showOnHover = false;
  showHeavyPic = false;

  constructor() {}

  ngOnInit() {}

  onMouseOver() {
    if (this.container.showHeavyPictureOnHover) {
      this.showHeavyPic = true;
    }
  }

  onMouseOut() {
    if (this.container.showHeavyPictureOnHover) {
      this.showHeavyPic = false;
    }
  }

  onLoad() {
    if (!this.container.showHeavyPictureOnHover) {
      this.showHeavyPic = true;
    }
  }
}
