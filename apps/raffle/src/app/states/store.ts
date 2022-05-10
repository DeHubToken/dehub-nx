import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { load, save } from 'redux-localstorage-simple';
import pauseReducer from './pause';
import specialLotteryReducer from './special-raffle';
import standardLotteryReducer from './standard-raffle';

const PERSISTED_KEYS: string[] = ['standardLottery', 'specialLottery'];

export const store = configureStore({
  reducer: {
    paused: pauseReducer,
    standardLottery: standardLotteryReducer,
    specialLottery: specialLotteryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: true,
  }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
