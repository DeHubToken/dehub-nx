import React from 'react';
import styled from 'styled-components';
import SwiperCore, { Keyboard, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from '@dehub/react/pcsuikit';
import { useGetSortedRounds } from '../../state/hooks';
import 'swiper/swiper.min.css';
import RoundCard from './components/RoundCard';
import Menu from './components/Menu';
import useSwiper from './hooks/useSwiper';
import useOnNextRound from './hooks/useOnNextRound';
import { Round } from '../../state/types';

SwiperCore.use([Keyboard, Mousewheel]);

const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
    padding: 30px 0;
  }

  .swiper-slide {
    width: 320px;
  }
`;
const Positions: React.FC = () => {
  const { setSwiper } = useSwiper();
  const rounds = useGetSortedRounds();
  const initialIndex = Math.floor(rounds.length / 2);

  useOnNextRound();

  return (
    <Box overflow="hidden">
      <Menu />
      <StyledSwiper>
        <Swiper
          initialSlide={initialIndex}
          onSwiper={setSwiper}
          spaceBetween={16}
          slidesPerView="auto"
          freeMode
          freeModeSticky
          centeredSlides
          mousewheel
          keyboard
          resizeObserver
        >
          {rounds.map((round: Round) => (
            <SwiperSlide key={round.id}>
              <RoundCard round={round} />
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>
    </Box>
  );
};

export default Positions;
