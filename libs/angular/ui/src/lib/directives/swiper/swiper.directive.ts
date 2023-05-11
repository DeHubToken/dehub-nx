import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import {
  swiperContainerStyles,
  swiperPrevNextStyles,
  swiperSlideStyles,
} from '@dehub/shared/model';
import Swiper, { SwiperOptions } from 'swiper';

@Directive({
  standalone: true,
  selector: '[dhbSwiper]',
})
export class SwiperDirective implements AfterViewInit {
  @Input() swiperOptions?: SwiperOptions;

  constructor(
    private el: ElementRef<
      HTMLElement & { swiper?: Swiper } & { initialize: () => void }
    >
  ) {}

  ngAfterViewInit() {
    const defaultOptions: SwiperOptions = {
      injectStyles: [
        swiperContainerStyles,
        swiperSlideStyles,
        swiperPrevNextStyles,
      ],
    };

    Object.assign(this.el.nativeElement, {
      ...defaultOptions,
      ...this.swiperOptions,
    });

    this.el.nativeElement.initialize();
  }
}
