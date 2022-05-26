import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsPipe } from './as.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AsPipe],
  exports: [AsPipe],
})
export class AsPipeModule {}
