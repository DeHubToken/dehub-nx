import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AssetFragment } from '@dehub/shared/model';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { ContentfulImgAltPipe } from '../../pipes/contentful-img-alt/contentful-img-alt.pipe';

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
    ContentfulImgAltPipe,
  ],
  template: `
    <span (mouseover)="onMouseOver()" (mouseout)="onMouseOut()">
      <ng-container *ngIf="container.picture as picture">
        <img
          *ngIf="picture.url"
          [dhbContentfulDraft]="picture.sys"
          [ngSrc]="picture.url"
          [width]="picture.width"
          [height]="picture.height"
          [priority]="priority"
          [alt]="picture | dhbContentfulImgAlt"
          sizes="50vw"
          [ngClass]="{ hidden: showHeavyPic, 'h-auto': true }"
        />
      </ng-container>
      <ng-container *ngIf="container.heavyPicture as heavyPicture">
        <img
          *ngIf="
            heavyPicture.url && heavyPicture.contentType !== 'image/gif';
            else gif
          "
          [dhbContentfulDraft]="heavyPicture.sys"
          [ngSrc]="heavyPicture.url"
          [width]="heavyPicture.width"
          [height]="heavyPicture.height"
          [priority]="priority"
          [alt]="heavyPicture | dhbContentfulImgAlt"
          (load)="onLoad()"
          sizes="100vw"
          [ngClass]="{
            hidden: !showHeavyPic,
            'h-auto': true,
            'w-auto': false
          }"
        />
        <ng-template #gif>
          <!-- https://codelabs.developers.google.com/codelabs/avif#5 -->
          <picture
            autoplay
            loop
            muted
            playsinline
            [ngClass]="{
              hidden: !showHeavyPic
            }"
          >
            <source
              type="image/webp"
              [srcset]="heavyPicture.webpUrl"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              sizes="100vw"
            />
            <!-- TODO: Safari not render avif -->
            <!-- <source
              type="image/avif"
              [srcset]="heavyPicture.avifUrl"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              sizes="100vw"
            /> -->
            <img
              *ngIf="heavyPicture.url"
              [dhbContentfulDraft]="heavyPicture.sys"
              [ngSrc]="heavyPicture.url"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              [priority]="priority"
              [alt]="heavyPicture | dhbContentfulImgAlt"
              (load)="onLoad()"
              sizes="100vw"
              [ngClass]="{
                'h-auto': true,
                'w-auto': false
              }"
            />
          </picture>
        </ng-template>
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
  @Input() showOnHover = false;
  @Input() autoHeight = false;
  @Input() priority = false;
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
