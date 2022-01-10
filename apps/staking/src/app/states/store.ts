import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import applicationReducer from './application';
import pauseReducer from './pause';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    application: applicationReducer,
    paused: pauseReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
