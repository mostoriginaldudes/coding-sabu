import { configureStore, combineReducers, Reducer, Store, Action } from '@reduxjs/toolkit';
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
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import authReducer, { AuthActions, State as AuthState } from './auth';
import lessonReducer, { LessonActions } from './lesson';
import lectureReducer, { LectureActions } from './lecture';
import uiReducer, { UIActions } from './ui';

export type ThunkAsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

const persistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  version: 1,
  storage,
  stateReconciler: hardSet
};

const rootReducer = combineReducers({
  auth: persistReducer<AuthState, Action<AuthActions>>(persistConfig, authReducer),
  lesson: lessonReducer,
  lecture: lectureReducer,
  ui: uiReducer
});

type CustomActions = AuthActions | LessonActions | LectureActions | UIActions;
type TotalActions = Action<CustomActions> & { type: typeof HYDRATE; payload: any };

const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
};

const reducer = (state: ReturnType<typeof rootReducer>, action: TotalActions) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    };
  } else {
    return rootReducer(state, action);
  }
};

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

export type RootState = ReturnType<typeof store.getState>;
export type StoreType = Store<RootState, Action<TotalActions>>;

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production'
});
