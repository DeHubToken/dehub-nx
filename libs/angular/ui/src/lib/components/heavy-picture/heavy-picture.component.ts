import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AssetFragment } from '@dehub/shared/model';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { ContentfulImageAltPipe } from '../../pipes/contentful-image-alt/contentful-image-alt.pipe';

@Component({
  selector: 'dhb-heavy-picture',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgClass,
    NgOptimizedImage,
    // UI
    ContentfulDraftDirective,
    ContentfulImageAltPipe,
  ],
  template: `
    <span (mouseover)="onMouseOver()" (mouseout)="onMouseOut()">
      <!-- Simple Picture -->
      <ng-container *ngIf="container.picture as picture">
        <img
          *ngIf="picture.url"
          [dhbContentfulDraft]="picture.sys"
          [ngSrc]="picture.url"
          [width]="picture.width"
          [height]="picture.height"
          [priority]="priority"
          [sizes]="sizes"
          [alt]="picture | dhbContentfulImageAlt"
          [ngClass]="{
            hidden: showHeavyPic,
            'h-auto': autoHeight,
          }"
        />
      </ng-container>

      <!-- Heavy Picture -->
      <!-- @audit Safari not support avif, and cannot loop either Chrome/Safari instead of gif -->
      <!-- @note https://codelabs.developers.google.com/codelabs/avif#5 -->
      <ng-container *ngIf="container.heavyPicture as heavyPicture">
        <img
          *ngIf="heavyPicture.url"
          [dhbContentfulDraft]="heavyPicture.sys"
          [ngSrc]="heavyPicture.url"
          [loaderParams]="{ format: 'webp' }"
          [width]="heavyPicture.width"
          [height]="heavyPicture.height"
          (load)="onLoad()"
          [priority]="priority"
          [sizes]="sizes"
          [alt]="heavyPicture | dhbContentfulImageAlt"
          [ngClass]="{
            hidden: !showHeavyPic,
            'h-auto': autoHeight
          }"
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
    picture?: AssetFragment;
    heavyPicture?: AssetFragment;
    showHeavyPictureOnHover?: boolean;
  }
> implements OnInit
{
  @Input() container!: C;
  @Input() autoHeight = true;
  @Input() priority = false;
  showHeavyPic = false;

  sizes =
    '(max-width: 991px) 50vw, (max-width: 1250px) 25vw, (max-width: 1700px) 20vw, 10vw';

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
