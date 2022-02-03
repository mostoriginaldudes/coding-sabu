import { ThunkAsyncState } from '.';
import { ThunkAction } from 'redux-thunk';
import { Lesson } from 'types';
import { fetchLessons } from 'apis';

// constants
const FETCH_LESSONS = 'lesson/FETCH_LESSONS' as const;
const FETCH_LESSONS_SUCCESS = 'lesson/FETCH_LESSONS_SUCCESS' as const;
const FETCH_LESSONS_FAIL = 'lesson/FETCH_LESSONS_FAIL' as const;

// types
export interface State {
  readonly lessons: ThunkAsyncState<Lesson[]>;
}

type Action =
  | { type: typeof FETCH_LESSONS }
  | { type: typeof FETCH_LESSONS_SUCCESS; payload: Lesson[] }
  | { type: typeof FETCH_LESSONS_FAIL; payload: Error };

type FetchLessonsThunkAction = ThunkAction<void, State, null, Action>;

// action creators
export const createActionFetchLessons =
  (): FetchLessonsThunkAction => async dispatch => {
    dispatch({ type: FETCH_LESSONS });
    try {
      const lessons = await fetchLessons();
      dispatch({ type: FETCH_LESSONS_SUCCESS, payload: lessons.data });
    } catch (error) {
      dispatch({ type: FETCH_LESSONS_FAIL, payload: error as Error });
    }
  };

// initialState
const initialState: State = {
  lessons: {
    loading: false,
    data: null,
    error: null
  }
};

// reducer
function lessonReducer(state = initialState, action: Action) {
  switch (action.type) {
    case FETCH_LESSONS:
      return {
        ...state,
        lessons: {
          loading: true,
          data: null,
          error: null
        }
      };
    case FETCH_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case FETCH_LESSONS_FAIL:
      return {
        ...state,
        lessons: {
          loading: false,
          data: null,
          error: action.payload
        }
      };
    default:
      return state;
  }
}

export default lessonReducer;
