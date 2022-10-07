import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnouncementComponent } from './announcement.component';

@NgModule({
  declarations: [AnnouncementComponent],
  imports: [
    // Angular
    CommonModule,
  ],
  exports: [AnnouncementComponent],
})
export class AnnouncementModule {}
