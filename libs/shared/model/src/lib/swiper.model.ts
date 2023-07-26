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

    &.no-padding-bottom {
      padding-bottom: 0px;
    }
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
    transition: .5s ease-in-out;
  }

  .swiper-button-prev:hover, .swiper-button-next:hover {
    filter: brightness(80%);
  }

  .swiper-button-prev::after, .swiper-button-next::after {
    content: '';
  }

  .swiper-button-prev {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='496' height='496' viewBox='0 0 496 496'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: rgba(98, 47, 136, 1); %7D .cls-2 %7B fill: rgba(255, 255, 255, 0.9); %7D %3C/style%3E%3C/defs%3E%3Cg id='prev' transform='translate(504 504) rotate(180)'%3E%3Cpath id='Path_1' data-name='Path 1' class='cls-1' d='M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8ZM369.9,273,234.4,408.5a23.9,23.9,0,0,1-33.9,0l-17-17a23.9,23.9,0,0,1,0-33.9L285.1,256,183.5,154.4a23.9,23.9,0,0,1,0-33.9l17-17a23.9,23.9,0,0,1,33.9,0L369.9,239a24,24,0,0,1,0,34Z'/%3E%3Cpath id='Path_2' data-name='Path 2' class='cls-2' d='M369.9,273,234.4,408.5a23.9,23.9,0,0,1-33.9,0l-17-17a23.9,23.9,0,0,1,0-33.9L285.1,256,183.5,154.4a23.9,23.9,0,0,1,0-33.9l17-17a23.9,23.9,0,0,1,33.9,0L369.9,239a24,24,0,0,1,0,34Z'/%3E%3C/g%3E%3C/svg%3E%0A");
    right: 60px;
    left: auto;
  }

  .swiper-button-next {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='496' height='496' viewBox='0 0 496 496'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: rgba(98, 47, 136, 1); %7D .cls-2 %7B fill: rgba(255, 255, 255, 0.9); %7D %3C/style%3E%3C/defs%3E%3Cg id='next' transform='translate(-8 -8)'%3E%3Cpath id='Path_1' data-name='Path 1' class='cls-1' d='M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8ZM369.9,273,234.4,408.5a23.9,23.9,0,0,1-33.9,0l-17-17a23.9,23.9,0,0,1,0-33.9L285.1,256,183.5,154.4a23.9,23.9,0,0,1,0-33.9l17-17a23.9,23.9,0,0,1,33.9,0L369.9,239a24,24,0,0,1,0,34Z'/%3E%3Cpath id='Path_2' data-name='Path 2' class='cls-2' d='M369.9,273,234.4,408.5a23.9,23.9,0,0,1-33.9,0l-17-17a23.9,23.9,0,0,1,0-33.9L285.1,256,183.5,154.4a23.9,23.9,0,0,1,0-33.9l17-17a23.9,23.9,0,0,1,33.9,0L369.9,239a24,24,0,0,1,0,34Z'/%3E%3C/g%3E%3C/svg%3E%0A");;
  }
`;
