import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAsyncState } from '.';
import { Lesson } from 'types';
import {
  createLessonRequest,
  fetchLessonListRequest,
  fetchMyJoiningLessonListRequest,
  fetchMyTeachingLessonListRequest,
  fetchOneLessonRequest,
  joinLessonRequest
} from 'apis';

const FETCH_LESSONS = 'lesson/FETCH_LESSONS' as const;
const FETCH_MY_JOINING_LESSONS = 'lesson/FETCH_MY_JOINING_LESSONS' as const;
const FETCH_MY_TEACHING_LESSONS = 'lesson/FETCH_MY_TEACHING_LESSONS' as const;
const CREATE_LESSON = 'lesson/CREATE_LESSON' as const;
const FETCH_ONE_LESSON = 'lesson/FETCH_ONE_LESSON' as const;
const JOIN_LESSON = 'lesson/JOIN_LESSON' as const;

export interface State {
  readonly lessons: ThunkAsyncState<Lesson[]>;
  readonly myJoiningLessons: ThunkAsyncState<Lesson[]>;
  readonly myTeachingLessons: ThunkAsyncState<Lesson[]>;
  readonly lessonDetailInfo: ThunkAsyncState<Lesson>;
}

const initialState: State = {
  lessons: {
    loading: false,
    data: null,
    error: null
  },
  myJoiningLessons: {
    loading: false,
    data: null,
    error: null
  },
  myTeachingLessons: {
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

const lessonSlice = createSlice({
  name: 'lesson',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchLessons.pending, state => {
        state.lessons = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.lessons = {
          loading: false,
          data: action.payload,
          error: null
        };
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.myJoiningLessons = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addCase(fetchMyJoiningLessons.pending, state => {
        state.myJoiningLessons = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(fetchMyJoiningLessons.fulfilled, (state, action) => {
        state.myJoiningLessons = {
          loading: false,
          data: action.payload,
          error: null
        };
      })
      .addCase(fetchMyJoiningLessons.rejected, (state, action) => {
        state.lessons = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addCase(fetchMyTeachingLessons.pending, state => {
        state.myTeachingLessons = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(fetchMyTeachingLessons.fulfilled, (state, action) => {
        state.myTeachingLessons = {
          loading: false,
          data: action.payload,
          error: null
        };
      })
      .addCase(fetchMyTeachingLessons.rejected, (state, action) => {
        state.myTeachingLessons = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addCase(fetchOneLesson.pending, state => {
        state.lessonDetailInfo = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(fetchOneLesson.fulfilled, (state, action) => {
        state.lessonDetailInfo = {
          loading: false,
          data: action.payload,
          error: null
        };
      })
      .addCase(fetchOneLesson.rejected, (state, action) => {
        state.lessonDetailInfo = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addCase(joinLesson.pending, (state, action) => {
        state.myJoiningLessons = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(joinLesson.fulfilled, (state, action) => {
        state.myJoiningLessons = {
          loading: false,
          data: state.myJoiningLessons.data?.concat(action.payload) || state.myJoiningLessons.data,
          error: null
        };
      })
      .addCase(joinLesson.rejected, (state, action) => {
        state.myJoiningLessons = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addDefaultCase(state => state);
  }
});

export const fetchLessons = createAsyncThunk(FETCH_LESSONS, async () => {
  const allLessonList = await fetchLessonListRequest();
  return allLessonList.lessons;
});

export const fetchMyJoiningLessons = createAsyncThunk(
  FETCH_MY_JOINING_LESSONS,
  async (_: void, { rejectWithValue }) => {
    try {
      const myJoiningLessonList = await fetchMyJoiningLessonListRequest();
      return myJoiningLessonList.lessons;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchMyTeachingLessons = createAsyncThunk(
  FETCH_MY_TEACHING_LESSONS,
  async (_: void, { rejectWithValue }) => {
    try {
      const myTeachingLessonList = await fetchMyTeachingLessonListRequest();
      return myTeachingLessonList.lessons;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createLesson = createAsyncThunk(
  CREATE_LESSON,
  async (lesson: FormData, { rejectWithValue }) => {
    try {
      const newLesson = await createLessonRequest(lesson);
      return newLesson;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchOneLesson = createAsyncThunk(
  FETCH_ONE_LESSON,
  async (id: number, { rejectWithValue }) => {
    try {
      const lesson = await fetchOneLessonRequest(id);
      return lesson;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const joinLesson = createAsyncThunk(
  JOIN_LESSON,
  async ({ lessonId, userId }: { lessonId: number; userId: number }, { rejectWithValue }) => {
    try {
      const myNewLesson = await joinLessonRequest(lessonId, userId);
      return myNewLesson.lesson;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export type LessonActions = typeof lessonSlice.actions;
export default lessonSlice.reducer;
