import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComingSoonDirective } from '@dehub/angular/ui/directives/coming-soon/coming-soon.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ComingSoonDirective],
  exports: [ComingSoonDirective],
})
export class ComingSoonDirectiveModule {}
