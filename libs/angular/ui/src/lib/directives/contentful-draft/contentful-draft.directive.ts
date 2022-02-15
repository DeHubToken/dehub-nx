import { Directive, HostBinding, Input } from '@angular/core';
import { SysFragment } from '@dehub/shared/model';

@Directive({
  selector: '[dhbContentfulDraft]',
})
export class ContentfulDraftDirective {
  @Input() dhbContentfulDraft?: SysFragment;

  @HostBinding('class.opacity-20')
  get isDraft() {
    return this.dhbContentfulDraft?.publishedAt === null;
  }
}
