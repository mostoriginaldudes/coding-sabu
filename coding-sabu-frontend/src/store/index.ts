import { configureStore, combineReducers, Reducer, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import authReducer, { State as AuthState, AuthActions } from './auth';
import lessonReducer, { LessonActions } from './lesson';
import lectureReducer, { LectureActions } from './lecture';
import uiReducer, { UIActions } from './ui';

export type ThunkAsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

type CustomActions = AuthActions | LessonActions | LectureActions | UIActions;
type TotalActions = Action<CustomActions> & { type: typeof HYDRATE; payload: any };

export type RootState = ReturnType<typeof rootReducer>;
export type StoreType = typeof store;
export type AppDispatch = typeof store.dispatch;

const envIsDev = process.env.NODE_ENV === 'development';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  stateReconciler: hardSet,
  debug: envIsDev
};

const rootReducer = combineReducers({
  auth: persistReducer<AuthState, TotalActions>(persistConfig, authReducer),
  lesson: lessonReducer,
  lecture: lectureReducer,
  ui: uiReducer
});

const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
};

const reducer = (state: RootState, action: TotalActions): RootState => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return rootReducer(state, action);
  }
};

export const store = configureStore({
  reducer: reducer as Reducer<RootState, TotalActions>,
  devTools: envIsDev,
  middleware: getDefaultMiddleware => {
    return !envIsDev
      ? getDefaultMiddleware(defaultMiddlewareOptions)
      : getDefaultMiddleware(defaultMiddlewareOptions).concat(logger);
  }
});

const makeStore: MakeStore<StoreType> = () => store;

export const wrapper = createWrapper(makeStore, {
  debug: envIsDev
});
