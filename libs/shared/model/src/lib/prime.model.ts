/**
 * Default PrimeFlex breakpoints
 * Source: https://github.com/primefaces/primeflex/blob/4906c3d69d1366f5f1f7bbebc6cbad53753434ea/_sass/lib/src/_variables.scss#L3
 * */
export enum BreakPoint {
  sm = '576px',
  md = '768px',
  lg = '992px',
  xl = '1200px',
}

// Carousel: https://www.primefaces.org/primeng/showcase/#/carousel
interface CarouselResponsiveOption {
  /** width in pixel like: '1024px' */
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

export type CarouselResponsiveOptions = CarouselResponsiveOption[];
