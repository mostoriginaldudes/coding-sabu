import { ThunkAsyncState } from '.';
import { ThunkAction } from 'redux-thunk';
import { produce } from 'immer';
import { Lecture } from 'types';
import { fetchLectureUnits } from 'apis';

// constants
const FETCH_LECTURE_UNITS = 'lecture/FETCH_LECTURE_UNITS' as const;
const FETCH_LECTURE_UNITS_SUCCESS =
  'lecture/FETCH_LECTURE_UNITS_SUCCESS' as const;
const FETCH_LECTURE_UNITS_FAIL = 'lecture/FETCH_LECTURE_UNITS_FAIL' as const;

// types
export interface State {
  readonly lectureUnits: ThunkAsyncState<Lecture[]>;
}

type Action =
  | { type: typeof FETCH_LECTURE_UNITS }
  | { type: typeof FETCH_LECTURE_UNITS_SUCCESS; payload: Lecture[] }
  | { type: typeof FETCH_LECTURE_UNITS_FAIL; payload: Error };

type LectureThunkAction = ThunkAction<void, State, null, Action>;

// action creators
export const createActionFetchLectureUnits =
  (lessonId: number): LectureThunkAction =>
  async dispatch => {
    dispatch({ type: FETCH_LECTURE_UNITS });
    try {
      const data = await fetchLectureUnits(lessonId);
      dispatch({
        type: FETCH_LECTURE_UNITS_SUCCESS,
        payload: data.lectureUnits
      });
    } catch (error) {
      dispatch({ type: FETCH_LECTURE_UNITS_FAIL, payload: error as Error });
    }
  };

// initialState
const initialState: State = {
  lectureUnits: {
    loading: false,
    data: null,
    error: null
  }
};

// reducer
function lectureReducer(state = initialState, action: Action) {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH_LECTURE_UNITS:
        draft.lectureUnits = {
          loading: true,
          data: null,
          error: null
        };
        break;
      case FETCH_LECTURE_UNITS_SUCCESS:
        draft.lectureUnits = {
          loading: false,
          data: action.payload,
          error: null
        };
        break;
      case FETCH_LECTURE_UNITS_FAIL:
        draft.lectureUnits = {
          loading: false,
          data: null,
          error: action.payload
        };
        break;
      default:
        return state;
    }
  });
}

export default lectureReducer;
