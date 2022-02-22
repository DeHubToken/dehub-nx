export enum BreakPoint {
  sm = '576px',
  md = '768px',
  lg = '992px',
  xl = '1200px',
}

// Carousel: https://www.primefaces.org/primeng/showcase/#/carousel
interface CarouselResponsiveOption {
  /** width in pixel like: '1024px' */
  breakpoint: BreakPoint;
  numVisible: number;
  numScroll: number;
}

export type CarouselResponsiveOptions = CarouselResponsiveOption[];
