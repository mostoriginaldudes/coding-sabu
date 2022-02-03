import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import lessonReducer from './lesson';

export type ThunkAsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

const rootReducer = combineReducers({
  lesson: lessonReducer
});

const store = createStore(
  rootReducer,
  process.env.NODE_ENV !== 'production'
    ? composeWithDevTools(applyMiddleware(logger, ReduxThunk))
    : applyMiddleware(ReduxThunk)
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
