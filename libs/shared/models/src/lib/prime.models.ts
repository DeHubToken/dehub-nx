// Carousel: https://www.primefaces.org/primeng/showcase/#/carousel

interface CarouselResponsiveOption {
  /** width in pixel like: '1024px' */
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

export type CarouselResponsiveOptions = CarouselResponsiveOption[];
