import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MailingListFormComponent } from './mailing-list-form.component';

@NgModule({
  declarations: [MailingListFormComponent],
  imports: [
    // Angular
    CommonModule,
  ],
  exports: [MailingListFormComponent],
})
export class MailingListFormModule {}
