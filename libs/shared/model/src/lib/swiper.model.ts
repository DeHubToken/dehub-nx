// Swiper breakpoints: https://swiperjs.com/swiper-api#param-breakpoints
export interface SwiperResponsiveOptions {
  /** width in pixel like: '1024' */
  [key: string]: {
    slidesPerView: number;
    spaceBetween: number;
  };
}

/**
 *  Custom Swiper styling:
 *  https://dev.to/ivadyhabimana/customizing-swiperjs-prevnext-arrow-buttons-and-pagination-bullets-in-react-3gkh
 */

export const swiperContainerStyles = `
  swiper-container {
    padding-bottom: 60px;
  }
`;

export const swiperSlideStyles = `
  swiper-slide {
    /* Stretch slide vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
    height: auto;
    flex-direction: column;
  }
`;

export const swiperPrevNextStyles = `
  .swiper-button-prev, .swiper-button-next {
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    width: 40px;
    height: 40px;
    top: auto;
    bottom: 0px;
    z-index: 9999;
  }

  .swiper-button-prev::after, .swiper-button-next::after {
    content: '';
  }

  .swiper-button-prev {
    background-image: url('/assets/dehub/swiper/icons/prev.svg');
    right: 60px;
    left: auto;
  }

  .swiper-button-next {
    background-image: url('/assets/dehub/swiper/icons/next.svg');
  }
`;
