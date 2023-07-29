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
          *ngIf="!showHeavyPic && picture.url"
          [dhbContentfulDraft]="picture.sys"
          [ngSrc]="picture.url"
          [fill]="autoHeight"
          [width]="autoHeight ? undefined : picture.width"
          [height]="autoHeight ? undefined : picture.height"
          [priority]="priority"
          [sizes]="sizes"
          [alt]="picture | dhbContentfulImageAlt"
          [ngClass]="{
            'h-auto': !autoHeight
          }"
        />
      </ng-container>

      <!-- Heavy Picture -->
      <ng-container *ngIf="container.heavyPicture as heavyPicture">
        <img
          *ngIf="showHeavyPic && heavyPicture.url"
          [dhbContentfulDraft]="heavyPicture.sys"
          [ngSrc]="heavyPicture.url"
          [fill]="autoHeight"
          [width]="autoHeight ? undefined : heavyPicture.width"
          [height]="autoHeight ? undefined : heavyPicture.height"
          (load)="onLoad()"
          [priority]="priority"
          [sizes]="sizes"
          [alt]="heavyPicture | dhbContentfulImageAlt"
          [ngClass]="{
            'h-auto': !autoHeight
          }"
        />
      </ng-container>

      <ng-container *ngIf="container.picture as picture">
        <!-- <img
          *ngIf="false && picture.url"
          [dhbContentfulDraft]="picture.sys"
          [fill]="autoHeight"
          [ngSrc]="picture.url"
          [width]="autoHeight ? undefined : picture.width"
          [height]="autoHeight ? undefined : picture.height"
          [priority]="priority"
          [alt]="picture | dhbContentfulImageAlt"
          [sizes]="sizes"
          [ngClass]="{ hidden: showHeavyPic, 'h-auto': !autoHeight }"
        /> -->
      </ng-container>

      <ng-container *ngIf="container.heavyPicture as heavyPicture">
        <!-- <img
          *ngIf="
            false &&
              heavyPicture.url &&
              heavyPicture.contentType !== 'image/gif';
            else gif
          "
          [dhbContentfulDraft]="heavyPicture.sys"
          [fill]="autoHeight"
          [ngSrc]="heavyPicture.url"
          [width]="autoHeight ? undefined : heavyPicture.width"
          [height]="autoHeight ? undefined : heavyPicture.height"
          [priority]="priority"
          [alt]="heavyPicture | dhbContentfulImageAlt"
          (load)="onLoad()"
          [sizes]="sizes"
          [ngClass]="{
            hidden: !showHeavyPic,
            'h-auto': !autoHeight,
            'w-auto': false
          }"
        /> -->
        <ng-template #gif>
          <!-- https://codelabs.developers.google.com/codelabs/avif#5 -->
          <!-- <picture
            autoplay
            loop
            muted
            playsinline
            [ngClass]="{
              hidden: !showHeavyPic
            }"
          > -->
          <!-- <source
              type="image/webp"
              [srcset]="heavyPicture.url"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              [sizes]="sizes"
            /> -->

          <!-- TODO: Safari not render avif -->
          <!-- <source
              type="image/avif"
              [srcset]="heavyPicture.avifUrl"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              [sizes]="sizes"
            /> -->

          <!-- <img
              *ngIf="heavyPicture.url"
              [dhbContentfulDraft]="heavyPicture.sys"
              [fill]="autoHeight"
              [ngSrc]="heavyPicture.url"
              [width]="autoHeight ? undefined : heavyPicture.width"
              [height]="autoHeight ? undefined : heavyPicture.height"
              [priority]="priority"
              [alt]="heavyPicture | dhbContentfulImageAlt"
              (load)="onLoad()"
              [sizes]="sizes"
              [ngClass]="{
                'h-auto': !autoHeight,
                'w-auto': false
              }"
            /> -->

          <!-- </picture> -->
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
