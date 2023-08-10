import { BreakpointObserver } from '@angular/cdk/layout';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { SwiperResponsiveOptions } from '@dehub/shared/model';

/**
 * Detect image priority based on its index and how many images are visible in given swiper responsive breakpoints.
 *
 * @returns true only for images visible based on active media query
 */
@Pipe({
  name: 'dhbSwiperImagePriority',
  standalone: true,
  pure: true,
})
export class SwiperImagePriorityPipe implements PipeTransform {
  private breakPointObserver = inject(BreakpointObserver);

  /**
   * @param imageIndex 0 based image index coming from ngFor
   */
  transform(
    imageIndex: number,
    breakpoints?: SwiperResponsiveOptions
  ): boolean {
    if (!breakpoints) return false;

    // Find how many images are visible based on the given breakpoints
    const visibleImages = Object.entries(breakpoints).reduce(
      (prevCount, [media, { slidesPerView }]) =>
        slidesPerView &&
        slidesPerView !== 'auto' &&
        this.breakPointObserver.isMatched(`(min-width: ${media}px)`)
          ? Math.max(prevCount, slidesPerView)
          : prevCount,
      1
    );

    return imageIndex < visibleImages;
  }
}
