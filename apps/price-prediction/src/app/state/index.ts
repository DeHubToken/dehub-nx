import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import applicationReducer from './application';
import predictionsReducer from './predictions';
import blockReducer from './block';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    application: applicationReducer,
    block: blockReducer,
    predictions: predictionsReducer,
  },
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
