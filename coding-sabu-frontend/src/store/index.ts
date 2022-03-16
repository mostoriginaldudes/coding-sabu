import { configureStore, combineReducers, Reducer, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import authReducer, { AuthActions } from './auth';
import lessonReducer, { LessonActions } from './lesson';
import lectureReducer, { LectureActions } from './lecture';
import uiReducer, { UIActions } from './ui';

export type ThunkAsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

const persistConfig: PersistConfig<any> = {
  key: 'auth',
  version: 1,
  storage,
  stateReconciler: hardSet
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  lesson: lessonReducer,
  lecture: lectureReducer,
  ui: uiReducer
});

const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
};

type CustomActions = AuthActions | LessonActions | LectureActions | UIActions;
type TotalActions = Action<CustomActions> & { type: typeof HYDRATE; payload: any };

const reducer = (state: ReturnType<typeof rootReducer>, action: TotalActions) =>
  rootReducer(state, action);

export const store = configureStore({
  reducer: reducer as Reducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => {
    return process.env.NODE_ENV === 'production'
      ? getDefaultMiddleware(defaultMiddlewareOptions)
      : getDefaultMiddleware(defaultMiddlewareOptions).concat(logger);
  }
});

const makeStore: MakeStore<StoreType> = () => store;

export type RootState = ReturnType<typeof rootReducer>;
export type StoreType = typeof store;

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
