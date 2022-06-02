import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { LoaderComponent } from './loader.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [LoaderComponent],
})
export class LoaderModule {}
