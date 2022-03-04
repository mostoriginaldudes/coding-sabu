import { PersistConfig } from 'redux-persist/lib/types';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import authReducer, { State as AuthState } from './auth';
import lessonReducer from './lesson';
import lectureReducer from './lecture';
import uiReducer from './ui';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

export type ThunkAsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

const persistConfig: PersistConfig<any> = {
  key: 'auth',
  version: 1,
  storage,
  throttle: 500,
  stateReconciler: hardSet
};

const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
};

const rootReducer = combineReducers({
  auth: persistReducer<AuthState>(persistConfig, authReducer),
  lesson: lessonReducer,
  lecture: lectureReducer,
  ui: uiReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => {
    return process.env.NODE_ENV === 'production'
      ? getDefaultMiddleware(defaultMiddlewareOptions)
      : getDefaultMiddleware(defaultMiddlewareOptions).concat(logger);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
