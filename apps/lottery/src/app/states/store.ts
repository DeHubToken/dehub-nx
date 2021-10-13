import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { save, load } from 'redux-localstorage-simple';

import application from './application/reducers';
import standardLotteryReducer from './standard-lottery';

const PERSISTED_KEYS: string[] = ['user'];

export const store = configureStore({
  reducer: {
    application,
    standardLottery: standardLotteryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: true
  })
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();