import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { EmbedPostFragment } from '@dehub/shared/model';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'dhb-embed-post',
  template: `
    <div
      [innerHtml]="embedPost.embedCode! | dhbSafeHtml"
      [ngClass]="{
        'embed-container': embedPost.aspectRatio
      }"
      [class]="embedPost.aspectRatio || ''"
    ></div>
  `,
  styles: [
    `
      .embed-container {
        position: relative;
        height: 0;
        overflow: hidden;

        &.sixteen-by-nine {
          padding-bottom: 56.25%;
        }

        &.four-by-three {
          padding-top: 75%;
        }

        &.three-by-two {
          padding-top: 66.66%;
        }

        &.eight-by-five {
          padding-top: 62.5%;
        }

        &.one-by-one {
          padding-top: 100%;
        }

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, SafeHtmlPipe],
})
export class EmbedPostComponent implements OnInit {
  @Input() embedPost!: EmbedPostFragment;

  constructor(private renderer2: Renderer2) {}

  ngOnInit() {
    if (this.embedPost.scriptUrl) {
      const script = this.renderer2.createElement('script');
      script.type = `text/javascript`;
      script.src = this.embedPost.scriptUrl;
      this.renderer2.appendChild(document.body, script);
    }
  }
}
