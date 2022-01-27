import { ThunkAsyncState, ThunkDispatch, ThunkAction } from '.';
import { Lesson } from 'types';
import { fetchLessons } from 'apis';

// types
interface State {
  readonly lessons: ThunkAsyncState<Lesson[]>;
}

type Action =
  | { type: 'lesson/GET_LESSONS'; payload: ThunkAsyncState<null> }
  | { type: 'lesson/GET_LESSONS_SUCCESS'; payload: ThunkAsyncState<Lesson[]> }
  | { type: 'lesson/GET_LESSONS_FAIL'; payload: ThunkAsyncState<null> };

// constants
const GET_LESSONS = 'lesson/GET_LESSONS' as const;
const GET_LESSONS_SUCCESS = 'lesson/GET_LESSONS_SUCCESS' as const;
const GET_LESSONS_FAIL = 'lesson/GET_LESSONS_FAIL' as const;

// action creators
export const getLessons: ThunkAction =
  () => async (dispatch: ThunkDispatch) => {
    dispatch({ type: GET_LESSONS });
    try {
      const lessons = await fetchLessons();
      dispatch({ type: GET_LESSONS_SUCCESS, payload: lessons });
    } catch (error) {
      dispatch({ type: GET_LESSONS_FAIL, payload: error });
    }
  };

const initialState: State = {
  lessons: {
    loading: false,
    data: null,
    error: null
  }
};

function lessonReducer(state = initialState, action: Action) {
  switch (action.type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: {
          loading: true,
          data: null,
          error: null
        }
      };
    case GET_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case GET_LESSONS_FAIL:
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
