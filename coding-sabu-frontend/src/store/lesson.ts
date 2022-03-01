import { ThunkAsyncState } from '.';
import { ThunkAction } from 'redux-thunk';
import { produce } from 'immer';
import { Lesson } from 'types';
import {
  createLesson,
  fetchLessonList,
  fetchMyLessonList,
  fetchOneLesson,
  joinLesson
} from 'apis';

// constants
const FETCH_LESSONS = 'lesson/FETCH_LESSONS' as const;
const FETCH_LESSONS_SUCCESS = 'lesson/FETCH_LESSONS_SUCCESS' as const;
const FETCH_LESSONS_FAIL = 'lesson/FETCH_LESSONS_FAIL' as const;
const FETCH_MY_LESSONS = 'lesson/FETCH_MY_LESSONS' as const;
const FETCH_MY_LESSONS_SUCCESS = 'lesson/FETCH_MY_LESSONS_SUCCESS' as const;
const FETCH_MY_LESSONS_FAIL = 'lesson/FETCH_MY_LESSONS_FAIL' as const;
const CREATE_LESSON = 'lesson/CREATE_LESSON' as const;
const CREATE_LESSON_SUCCESS = 'lesson/CREATE_LESSON_SUCCESS' as const;
const CREATE_LESSON_FAIL = 'lesson/CREATE_LESSON_FAIL' as const;
const FETCH_ONE_LESSON = 'lesson/FETCH_ONE_LESSON' as const;
const FETCH_ONE_LESSON_SUCCESS = 'lesson/FETCH_ONE_LESSON_SUCCESS' as const;
const FETCH_ONE_LESSON_FAIL = 'lesson/FETCH_ONE_LESSON_FAIL' as const;
const JOIN_LESSON = 'lesson/JOIN_LESSON' as const;
const JOIN_LESSON_SUCCESS = 'lesson/JOIN_LESSON_SUCCESS' as const;
const JOIN_LESSON_FAIL = 'lesson/JOIN_LESSON_FAIL' as const;

// types
export interface State {
  readonly lessons: ThunkAsyncState<Lesson[]>;
  readonly mylessons: ThunkAsyncState<Lesson[]>;
  readonly lessonDetailInfo: ThunkAsyncState<Lesson>;
}

type Action =
  | { type: typeof FETCH_LESSONS }
  | { type: typeof FETCH_LESSONS_SUCCESS; payload: Lesson[] }
  | { type: typeof FETCH_LESSONS_FAIL; payload: Error }
  | { type: typeof FETCH_MY_LESSONS }
  | { type: typeof FETCH_MY_LESSONS_SUCCESS; payload: Lesson[] }
  | { type: typeof FETCH_MY_LESSONS_FAIL; payload: Error }
  | { type: typeof CREATE_LESSON }
  | { type: typeof CREATE_LESSON_SUCCESS }
  | { type: typeof CREATE_LESSON_FAIL }
  | { type: typeof FETCH_ONE_LESSON }
  | { type: typeof FETCH_ONE_LESSON_SUCCESS; payload: Lesson }
  | { type: typeof FETCH_ONE_LESSON_FAIL; payload: Error }
  | { type: typeof JOIN_LESSON }
  | { type: typeof JOIN_LESSON_SUCCESS; payload: Lesson }
  | { type: typeof JOIN_LESSON_FAIL; payload: Error };

type LessonThunkAction = ThunkAction<void, State, null, Action>;

// action creators
export const createActionFetchLessons =
  (): LessonThunkAction => async dispatch => {
    dispatch({ type: FETCH_LESSONS });
    try {
      const data = await fetchLessonList();
      dispatch({ type: FETCH_LESSONS_SUCCESS, payload: data.lessons });
    } catch (error) {
      dispatch({ type: FETCH_LESSONS_FAIL, payload: error as Error });
    }
  };

export const createActionFetchMyLessons =
  (): LessonThunkAction => async dispatch => {
    dispatch({ type: FETCH_MY_LESSONS });
    try {
      const data = await fetchMyLessonList();
      dispatch({ type: FETCH_MY_LESSONS_SUCCESS, payload: data.lessons });
    } catch (error) {
      dispatch({ type: FETCH_MY_LESSONS_FAIL, payload: error as Error });
    }
  };

export const createActionCreateLesson =
  (lesson: FormData): LessonThunkAction =>
  async dispatch => {
    dispatch({ type: CREATE_LESSON });
    try {
      await createLesson(lesson);
      dispatch({ type: CREATE_LESSON_SUCCESS });
    } catch (error) {
      dispatch({ type: CREATE_LESSON_FAIL });
    }
  };

export const createActionFetchOneLesson =
  (id: number): LessonThunkAction =>
  async dispatch => {
    dispatch({ type: FETCH_ONE_LESSON });
    try {
      const lesson = await fetchOneLesson(id);
      dispatch({ type: FETCH_ONE_LESSON_SUCCESS, payload: lesson });
    } catch (error) {
      dispatch({ type: FETCH_ONE_LESSON_FAIL, payload: error as Error });
    }
  };

export const createActionJoinLesson =
  (lessonId: number, userId: number): LessonThunkAction =>
  async dispatch => {
    dispatch({ type: JOIN_LESSON });
    try {
      const myNewLesson = await joinLesson(lessonId, userId);
      dispatch({ type: JOIN_LESSON_SUCCESS, payload: myNewLesson.lesson });
    } catch (error) {
      dispatch({ type: JOIN_LESSON_FAIL, payload: error as Error });
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
  },
  lessonDetailInfo: {
    loading: false,
    data: null,
    error: null
  }
};

// reducer
function lessonReducer(state = initialState, action: Action) {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH_LESSONS:
        draft.lessons = {
          loading: true,
          data: null,
          error: null
        };
        break;
      case FETCH_LESSONS_SUCCESS:
        draft.lessons = {
          loading: false,
          data: action.payload,
          error: null
        };
        break;
      case FETCH_LESSONS_FAIL:
        draft.lessons = {
          loading: false,
          data: null,
          error: action.payload
        };
        break;
      case FETCH_MY_LESSONS:
        draft.mylessons = {
          loading: true,
          data: null,
          error: null
        };
        break;
      case FETCH_MY_LESSONS_SUCCESS:
        draft.mylessons = {
          loading: false,
          data: action.payload,
          error: null
        };
        break;
      case FETCH_MY_LESSONS_FAIL:
        draft.mylessons = {
          loading: false,
          data: null,
          error: action.payload
        };
        break;
      case FETCH_ONE_LESSON:
        draft.lessonDetailInfo = {
          loading: true,
          data: null,
          error: null
        };
        break;
      case FETCH_ONE_LESSON_SUCCESS:
        draft.lessonDetailInfo = {
          loading: false,
          data: action.payload,
          error: null
        };
        break;
      case FETCH_ONE_LESSON_FAIL:
        draft.lessonDetailInfo = {
          loading: false,
          data: null,
          error: action.payload
        };
        break;
      case JOIN_LESSON:
        draft.mylessons = {
          loading: true,
          data: state.mylessons.data,
          error: null
        };
        break;
      case JOIN_LESSON_SUCCESS:
        draft.mylessons = {
          loading: false,
          data:
            state.mylessons.data?.concat(action.payload) ||
            state.mylessons.data,
          error: null
        };
        break;
      case JOIN_LESSON_FAIL:
        draft.mylessons = {
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

export default lessonReducer;
