import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AssetFragment } from '@dehub/shared/model';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';

@Component({
  standalone: true,
  selector: 'dhb-heavy-picture',
  imports: [
    // Angular
    CommonModule,
    NgOptimizedImage,

    // Libs
    ContentfulDraftDirectiveModule,
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
          [attr.priority]="priority"
          [alt]="picture.description ?? picture.title"
          sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
          [ngClass]="{ hidden: showHeavyPic, 'h-auto': autoHeight }"
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
          [attr.priority]="priority"
          [alt]="heavyPicture.description ?? heavyPicture.title"
          (load)="onLoad()"
          sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
          [ngClass]="{ hidden: !showHeavyPic, 'h-auto': autoHeight }"
        />
        <ng-template #gif>
          <!-- https://codelabs.developers.google.com/codelabs/avif#5 -->
          <picture
            autoplay
            loop
            muted
            playsinline
            [ngClass]="{ hidden: !showHeavyPic, 'h-auto': autoHeight }"
          >
            <source
              type="image/webp"
              [srcset]="heavyPicture.webpUrl"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
            />
            <!-- TODO: Safari not render avif -->
            <!-- <source
              type="image/avif"
              [srcset]="heavyPicture.avifUrl"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
            /> -->
            <img
              *ngIf="heavyPicture.url"
              [dhbContentfulDraft]="heavyPicture.sys"
              [ngSrc]="heavyPicture.url"
              [width]="heavyPicture.width"
              [height]="heavyPicture.height"
              [attr.priority]="priority"
              [alt]="heavyPicture.description ?? heavyPicture.title"
              (load)="onLoad()"
              sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
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
  @Input() autoHeight = true;
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
