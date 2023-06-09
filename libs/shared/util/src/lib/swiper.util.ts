import { SwiperOptions } from 'swiper';

export const isPaginationClickable = (swiperOptions: SwiperOptions) =>
  (swiperOptions.pagination &&
    swiperOptions.pagination !== true &&
    swiperOptions.pagination.clickable) ||
  swiperOptions.pagination === true;
