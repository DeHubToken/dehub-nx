import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanPlayDirective } from './can-play.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CanPlayDirective],
  exports: [CanPlayDirective],
})
export class CanPlayDirectiveModule {}
