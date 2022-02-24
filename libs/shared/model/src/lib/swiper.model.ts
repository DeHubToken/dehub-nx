// Swiper breakpoints: https://swiperjs.com/swiper-api#param-breakpoints
export interface SwiperResponsiveOptions {
  /** width in pixel like: '1024' */
  [key: string]: {
    slidesPerView: number;
    spaceBetween: number;
  };
}
