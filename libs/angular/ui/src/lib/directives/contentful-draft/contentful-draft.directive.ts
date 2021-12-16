import { Directive, HostBinding, Input } from '@angular/core';
import { Sys } from '@dehub/shared/models';

@Directive({
  selector: '[dhbContentfulDraft]',
})
export class ContentfulDraftDirective {
  @Input() dhbContentfulDraft?: Sys;

  @HostBinding('class.opacity-50')
  get isDraft() {
    return !!this.dhbContentfulDraft?.publishedAt;
  }
}
