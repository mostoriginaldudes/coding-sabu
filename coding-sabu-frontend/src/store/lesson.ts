import { ThunkAsyncState } from '.';
import { ThunkAction } from 'redux-thunk';
import { Lesson } from 'types';
import { fetchLessonList } from 'apis';

// constants
const FETCH_LESSONS = 'lesson/FETCH_LESSONS' as const;
const FETCH_LESSONS_SUCCESS = 'lesson/FETCH_LESSONS_SUCCESS' as const;
const FETCH_LESSONS_FAIL = 'lesson/FETCH_LESSONS_FAIL' as const;
const FETCH_MY_LESSONS = 'lesson/FETCH_MY_LESSONS' as const;
const FETCH_MY_LESSONS_SUCCESS = 'lesson/FETCH_MY_LESSONS_SUCCESS' as const;
const FETCH_MY_LESSONS_FAIL = 'lesson/FETCH_MY_LESSONS_FAIL' as const;

// types
export interface State {
  readonly lessons: ThunkAsyncState<Lesson[]>;
  readonly mylessons: ThunkAsyncState<Lesson[]>;
}

type Action =
  | { type: typeof FETCH_LESSONS }
  | { type: typeof FETCH_LESSONS_SUCCESS; payload: Lesson[] }
  | { type: typeof FETCH_LESSONS_FAIL; payload: Error }
  | { type: typeof FETCH_MY_LESSONS }
  | { type: typeof FETCH_MY_LESSONS_SUCCESS; payload: Lesson[] }
  | { type: typeof FETCH_MY_LESSONS_FAIL; payload: Error };

type FetchLessonsThunkAction = ThunkAction<void, State, null, Action>;

// action creators
export const createActionFetchLessons =
  (): FetchLessonsThunkAction => async dispatch => {
    dispatch({ type: FETCH_LESSONS });
    try {
      const data = await fetchLessonList();
      dispatch({ type: FETCH_LESSONS_SUCCESS, payload: data.lessons });
    } catch (error) {
      dispatch({ type: FETCH_LESSONS_FAIL, payload: error as Error });
    }
  };

export const createActionFetchMyLessons =
  (): FetchLessonsThunkAction => async dispatch => {
    dispatch({ type: FETCH_MY_LESSONS });
    try {
      const data = await fetchLessonList();
      dispatch({ type: FETCH_MY_LESSONS_SUCCESS, payload: data.lessons });
    } catch (error) {
      dispatch({ type: FETCH_MY_LESSONS_FAIL, payload: error as Error });
    }
  };

// initialState
const initialState: State = {
  lessons: {
    loading: false,
    data: null,
    error: null
  },
  mylessons: {
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
    case FETCH_MY_LESSONS:
      return {
        ...state,
        mylessons: {
          loading: true,
          data: null,
          error: null
        }
      };
    case FETCH_MY_LESSONS_SUCCESS:
      return {
        ...state,
        mylessons: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case FETCH_MY_LESSONS_FAIL:
      return {
        ...state,
        mylessons: {
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
