import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DehubHomeComponent } from './dehub-home.component';
import { DehubRoutingModule } from './dehub-routing.module';

@NgModule({
  declarations: [DehubHomeComponent],
  imports: [CommonModule, DehubRoutingModule],
})
export class DehubModule {}
