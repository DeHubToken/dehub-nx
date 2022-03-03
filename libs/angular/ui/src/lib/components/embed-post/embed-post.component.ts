import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { EmbedPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-embed-post',
  template: `
    <div
      [innerHtml]="embedPost.embedCode! | dhbSafeHtml"
      class="px-5 pt-6 pb-7"
    ></div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
