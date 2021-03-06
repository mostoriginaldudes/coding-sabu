import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAsyncState } from '.';
import { fetchLectureRequest } from 'apis';
import { Lecture } from 'types';

const FETCH_LECTURE = 'lecture/FETCH_LECTURE' as const;

export interface State {
  readonly lectureUnits: ThunkAsyncState<Lecture[]>;
}

const initialState: State = {
  lectureUnits: {
    loading: false,
    data: null,
    error: null
  }
};

const lectureSlice = createSlice({
  name: 'lecture',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchLecture.pending, state => {
        state.lectureUnits = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(fetchLecture.fulfilled, (state, action) => {
        state.lectureUnits = {
          loading: false,
          data: action.payload,
          error: null
        };
      })
      .addCase(fetchLecture.rejected, (state, action) => {
        state.lectureUnits = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addDefaultCase(state => state);
  }
});

const fetchLecture = createAsyncThunk(
  FETCH_LECTURE,
  async (lessonId: number, { rejectWithValue }) => {
    try {
      const data = await fetchLectureRequest(lessonId);
      return data.lectureUnits;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export type LectureActions = typeof lectureSlice.actions | ReturnType<typeof fetchLecture>;
export { fetchLecture };
export default lectureSlice.reducer;
