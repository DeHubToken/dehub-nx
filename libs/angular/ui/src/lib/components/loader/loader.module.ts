import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';
import { LoaderComponent } from './loader.component';

/**
 * The lottie-web library.
 * Loaded on demand using dynamic import.
 * Webpack will load this library only when your animation gets rendered for the first time.
 */
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [LoaderComponent],
})
export class LoaderModule {}
