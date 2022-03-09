import { configureStore, combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit';
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
import logger from 'redux-logger';
import { HYDRATE } from 'next-redux-wrapper';
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

const reducer = (
  state: ReturnType<typeof rootReducer>,
  action: AuthActions &
    LessonActions &
    LectureActions &
    UIActions & { type: typeof HYDRATE } & { payload: any }
) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    };
  } else {
    return rootReducer(state, action);
  }
};

const store = configureStore({
  reducer: reducer as Reducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => {
    return process.env.NODE_ENV === 'production'
      ? getDefaultMiddleware(defaultMiddlewareOptions)
      : getDefaultMiddleware(defaultMiddlewareOptions).concat(logger);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
