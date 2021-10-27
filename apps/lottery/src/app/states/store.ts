import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { save, load } from 'redux-localstorage-simple';

import applicationReducer from './application';
import pauseReducer from './pause';
import standardLotteryReducer from './standard-lottery';
import specialLotteryReducer from './special-lottery';

const PERSISTED_KEYS: string[] = [
  'application',
  'standardLottery',
  'specialLottery',
];

export const store = configureStore({
  reducer: {
    application: applicationReducer,
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
