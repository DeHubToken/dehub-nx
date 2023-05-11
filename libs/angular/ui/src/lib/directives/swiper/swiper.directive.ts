import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import Swiper, { SwiperOptions } from 'swiper';

@Directive({
  standalone: true,
  selector: '[dhbSwiper]',
})
export class SwiperDirective implements AfterViewInit {
  @Input() swiperOptions?: SwiperOptions;

  private readonly dhbSwiper: HTMLElement;

  constructor(
    private el: ElementRef<
      HTMLElement & { swiper?: Swiper } & { initialize: () => void }
    >
  ) {
    this.dhbSwiper = el.nativeElement;
  }

  ngAfterViewInit() {
    Object.assign(this.el.nativeElement, this.swiperOptions);

    this.el.nativeElement.initialize();
  }
}
