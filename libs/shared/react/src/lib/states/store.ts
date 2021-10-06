import { configureStore } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import application from './application/reducers';

const PERSISTED_KEYS: string[] = ['user']

export const store = configureStore({
  reducer: {
    application
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: true
  })
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
