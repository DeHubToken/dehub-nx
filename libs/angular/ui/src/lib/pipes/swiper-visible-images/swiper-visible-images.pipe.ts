import { BreakpointObserver } from '@angular/cdk/layout';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { SwiperResponsiveOptions } from '@dehub/shared/model';

/**
 * Find how many images are visible based on the given Swiper breakpoints.
 */
@Pipe({
  name: 'dhbSwiperVisibleImages',
  standalone: true,
  pure: true,
})
export class SwiperVisibleImagesPipe implements PipeTransform {
  private breakPointObserver = inject(BreakpointObserver);

  transform(breakpoints: SwiperResponsiveOptions): number {
    if (!breakpoints) return 1;

    const visibleImages = Object.entries(breakpoints).reduce(
      (prevCount, [media, { slidesPerView }]) =>
        slidesPerView &&
        slidesPerView !== 'auto' &&
        this.breakPointObserver.isMatched(`(min-width: ${media}px)`)
          ? Math.max(prevCount, slidesPerView)
          : prevCount,
      1
    );

    return visibleImages;
  }
}
