import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useState,
} from 'react';
import SwiperCore from 'swiper';

interface Context {
  swiper: SwiperCore | null;
  setSwiper: Dispatch<React.SetStateAction<SwiperCore | null>>;
  destroySwiper: () => void;
}

export const SwiperContext = createContext<Context | undefined>(undefined);

const SwiperProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const destroySwiper = () => {
    if (swiper) {
      swiper.destroy();
      setSwiper(null);
    }
  };

  return (
    <SwiperContext.Provider value={{ swiper, setSwiper, destroySwiper }}>
      {children}
    </SwiperContext.Provider>
  );
};

export default SwiperProvider;
