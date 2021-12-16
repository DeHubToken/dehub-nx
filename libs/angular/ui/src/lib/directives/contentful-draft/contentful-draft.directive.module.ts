import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfulDraftDirective } from './contentful-draft.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ContentfulDraftDirective],
  exports: [ContentfulDraftDirective],
})
export class ContentfulDraftDirectiveModule {}
